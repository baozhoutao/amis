import React from 'react';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';
import Sortable from 'sortablejs';
import {
  DataSchema,
  FormItem,
  Button,
  Icon,
  TooltipWrapper,
  render as amisRender
} from 'amis';
import cloneDeep from 'lodash/cloneDeep';
import {FormControlProps, autobind, findTree} from 'amis-core';
import ActionDialog from './action-config-dialog';
import {
  findActionNode,
  findSubActionNode,
  getActionType,
  getEventDesc,
  getEventStrongDesc,
  getEventLabel,
  getPropOfAcion,
  SELECT_PROPS_CONTAINER
} from './helper';
import {
  ActionConfig,
  ActionEventConfig,
  ComponentInfo,
  ContextVariables
} from './types';
import {
  PluginActions,
  PluginEvents,
  RendererPluginAction,
  RendererPluginEvent,
  SubRendererPluginAction
} from 'amis-editor-core';
export * from './helper';
import {i18n as _i18n} from 'i18n-runtime';
import type {VariableItem} from 'amis-ui/lib/components/formula/Editor';
import {reaction} from 'mobx';

interface EventControlProps extends FormControlProps {
  actions: PluginActions; // 组件的动作列表
  events: PluginEvents; // 组件的事件列表
  actionTree: RendererPluginAction[]; // 动作树
  commonActions?: {[propName: string]: RendererPluginAction}; // 公共动作Map
  value: ActionEventConfig; // 事件动作配置
  onChange: (
    value: any,
    submitOnChange?: boolean,
    changeImmediately?: boolean
  ) => void;
  addBroadcast?: (event: RendererPluginEvent) => void;
  removeBroadcast?: (eventName: string) => void;
  getComponents: (action: any) => ComponentInfo[]; // 当前页面组件树
  getContextSchemas?: (id?: string, withoutSuper?: boolean) => DataSchema; // 获取上下文
  actionConfigInitFormatter?: (
    actionConfig: ActionConfig,
    variables: {
      eventVariables: ContextVariables[]; // 当前事件变量
      rawVariables: ContextVariables[]; // 绑定事件的组件上下文
    }
  ) => ActionConfig; // 动作配置初始化时格式化
  actionConfigSubmitFormatter?: (actionConfig: ActionConfig) => ActionConfig; // 动作配置提交时格式化
  owner?: string; // 组件标识
}

interface EventDialogData {
  eventName: string;
  eventLabel: string;
  isBroadcast: boolean;
  debounceConfig?: {
    open: boolean;
    wait?: number;
  };
  [propName: string]: any;
}

interface EventControlState {
  onEvent: ActionEventConfig;
  events: RendererPluginEvent[];
  eventPanelActive: {
    [prop: string]: boolean;
  };
  showAcionDialog: boolean;
  showEventDialog: boolean;
  eventDialogData?: EventDialogData;
  actionData:
    | {
        eventKey: string;
        actionIndex?: number;
        action?: ActionConfig;
        variables?: ContextVariables[];
        pluginActions: PluginActions;
        getContextSchemas?: (id?: string, withoutSuper?: boolean) => DataSchema;
        rawVariables: ContextVariables[];
        groupType?: string;
        __actionDesc?: string;
        __cmptTreeSource?: ComponentInfo[];
        __superCmptTreeSource?: ComponentInfo[];
        __actionSchema?: any;
        __subActions?: SubRendererPluginAction[];
        __setValueDs?: any[];
      }
    | undefined;
  type: 'update' | 'add';
  appLocaleState?: number;
}

export class EventControl extends React.Component<
  EventControlProps,
  EventControlState
> {
  target: HTMLElement | null;
  eventPanelSortMap: {
    [prop: string]: Sortable;
  } = {};
  drag?: HTMLElement | null;
  unReaction: any;

  constructor(props: EventControlProps) {
    super(props);
    const {events, value, data} = props;

    const eventPanelActive: {
      [prop: string]: boolean;
    } = {};

    const pluginEvents =
      events[!data.type || data.type === 'text' ? 'plain' : data.type] || [];

    pluginEvents.forEach((event: RendererPluginEvent) => {
      eventPanelActive[event.eventName] = true;
    });

    this.state = {
      onEvent: value ?? this.generateEmptyDefault(pluginEvents),
      events: pluginEvents,
      eventPanelActive,
      showAcionDialog: false,
      showEventDialog: false,
      actionData: undefined,
      type: 'add',
      appLocaleState: 0
    };
  }

  componentDidMount(): void {
    const editorStore = (window as any).editorStore;
    this.unReaction = reaction(
      () => editorStore?.appLocaleState,
      () => {
        this.setState({
          appLocaleState: editorStore?.appLocaleState
        });
      }
    );
  }

  componentWillUnmount() {
    this.unReaction?.();
  }

  componentDidUpdate(
    prevProps: EventControlProps,
    prevState: EventControlState
  ) {
    const {value, onChange} = this.props;

    if (value !== prevProps.value) {
      this.setState({onEvent: value});
    }

    if (prevState.onEvent !== this.state.onEvent) {
      onChange && onChange(this.state.onEvent);
    }
  }

  generateEmptyDefault(events: RendererPluginEvent[]) {
    const onEvent: ActionEventConfig = {};
    events.forEach((event: RendererPluginEvent) => {
      if (event.defaultShow) {
        onEvent[`${event.eventName}`] = {
          __isBroadcast: !!event.isBroadcast,
          weight: 0,
          actions: []
        };
      }
    });
    // Object.keys(onEvent).length && props.onChange && props.onChange(onEvent);

    return Object.keys(onEvent).length ? onEvent : {};
  }

  addEvent(event: RendererPluginEvent, disabled: boolean) {
    const {onChange} = this.props;
    let onEvent = {
      ...this.state.onEvent
    };
    if (disabled) {
      return;
    }
    onEvent[`${event.eventName}`] = {
      __isBroadcast: !!event.isBroadcast,
      weight: 0,
      actions: []
    };
    this.setState({
      onEvent: onEvent
    });

    onChange && onChange(onEvent);
  }

  activeEventDialog(eventInfo: EventDialogData) {
    if (!eventInfo.debounce) {
      // 防抖配置的默认值
      eventInfo.debounce = {
        open: false,
        wait: 100
      };
    } else {
      eventInfo.debounce = {
        open: true,
        ...eventInfo.debounce
      };
    }
    this.setState({
      eventDialogData: eventInfo,
      showEventDialog: true
    });
  }

  eventDialogSubmit(formData: any) {
    const {onChange} = this.props;
    const {eventName, debounce = {}} = formData;
    let onEvent = {
      ...this.state.onEvent
    };
    let eventConfig = onEvent[`${eventName}`];
    if (!debounce.open) {
      delete eventConfig.debounce;
    } else {
      eventConfig = {
        ...eventConfig,
        debounce: {
          wait: debounce.wait
        }
      };
    }
    onEvent[`${eventName}`] = {
      ...eventConfig
    };
    this.setState({
      onEvent,
      showEventDialog: false
    });
    onChange && onChange(onEvent);
  }

  delEvent(event: string) {
    const {onChange} = this.props;
    let onEvent = {
      ...this.state.onEvent
    };
    delete onEvent[event];
    this.setState({
      onEvent: onEvent
    });

    onChange && onChange(onEvent);
  }

  addAction(event: string, config: any) {
    const {addBroadcast, owner} = this.props;
    const {onEvent, eventPanelActive} = this.state;
    let onEventConfig = {...onEvent};
    let activeConfig = {...eventPanelActive};

    if (config.actionType === 'broadcast') {
      typeof addBroadcast === 'function' &&
        addBroadcast({
          owner: owner, // TODO:标记来源
          isBroadcast: true,
          eventName: config.eventName,
          eventLabel: config.eventLabel,
          description: config.description
        });
    }
    activeConfig[event] = true;
    if (config.actionType) {
      onEventConfig[event] = {
        ...onEventConfig[event],
        actions: onEventConfig[event].actions.concat(config)
      };
    }

    this.setState({
      onEvent: onEventConfig,
      eventPanelActive: activeConfig
    });
    this.initDragging();
    this.props.onChange && this.props.onChange(onEventConfig);
  }

  updateAction(event: string, index: number, config: any) {
    this.updateValue(event, index, config);
  }

  delAction(event: string, action: any, index: number) {
    const {onEvent, eventPanelActive} = this.state;
    const {removeBroadcast} = this.props;

    let onEventConfig = {...onEvent};
    let activeConfig = {...eventPanelActive};

    // 删掉对应广播
    if (action.actionType === 'broadcast') {
      typeof removeBroadcast === 'function' &&
        removeBroadcast(action.eventName);
    }

    onEventConfig[event] = {
      actions: onEventConfig[event].actions.filter(
        (item, actionIndex) => index !== actionIndex
      ),
      weight: onEvent[event].weight
    };

    if (onEventConfig[event].actions.length < 1) {
      activeConfig[event] = false;
      this.setState({
        eventPanelActive: activeConfig
      });
      this.eventPanelSortMap[event]?.destroy();
    }

    this.setState({
      onEvent: onEventConfig
    });

    this.props.onChange && this.props.onChange(onEventConfig);
  }

  toggleActivePanel(eventKey: string) {
    const {eventPanelActive} = this.state;
    eventPanelActive[eventKey] = !eventPanelActive[eventKey];
    if (!eventPanelActive[eventKey]) {
      this.eventPanelSortMap[eventKey]?.destroy();
    }
    this.setState({eventPanelActive}, () => {
      this.initDragging();
    });
  }

  updateWeight(event: string, data: any) {
    const {onEvent} = this.state;
    let onEventConfig = {...onEvent};
    onEventConfig[event] = {
      ...onEventConfig[event],
      weight: data.weight || 0
    };

    this.setState({
      onEvent: onEventConfig
    });
  }

  /**
   * 更新事件配置
   *
   * @param {string} event
   * @param {number} actionIndex
   * @param {*} config
   * @memberof EventControl
   */
  async updateValue(event: string, index: number, config: any) {
    const {onEvent} = this.state;
    let emptyEventAcion = {...onEvent};
    let onEventConfig = {...onEvent};

    emptyEventAcion[event] = {
      actions: onEvent[event].actions.map((item, actionIndex) => {
        return actionIndex === index ? {actionType: ''} : item;
      }),
      weight: onEvent[event].weight
    };
    onEventConfig[event] = {
      ...onEvent[event],
      actions: onEvent[event].actions.map((item, actionIndex) => {
        return actionIndex === index
          ? typeof config === 'string'
            ? {
                ...item,
                actionType: config
              }
            : config
          : item;
      })
    };
    this.setState({
      onEvent: onEventConfig
    });
    this.props.onChange && this.props.onChange(onEventConfig);
  }

  @autobind
  dragRef(ref: any) {
    if (!this.drag && ref) {
      this.initDragging();
    } else if (this.drag && !ref) {
      this.destroyDragging();
    }
    this.drag = ref;
  }

  initDragging() {
    this.eventPanelSortMap = {};
    const dom = findDOMNode(this) as HTMLElement;
    const {onEvent, eventPanelActive} = this.state;
    const eventPanel: object[] = Array.prototype.slice.call(
      dom.getElementsByClassName('item-content')
    );
    // 找到激活的事件面板
    Object.keys(onEvent)
      .filter((key: string) => {
        return onEvent[key].actions.length && eventPanelActive[key];
      })
      .forEach((key: string, index: number) => {
        if (!this.eventPanelSortMap[key]) {
          this.eventPanelSortMap[key] = this.genSortPanel(
            key,
            eventPanel[index] as HTMLElement
          );
        }
      });
  }

  genSortPanel(eventKey: string, ele: HTMLElement) {
    return new Sortable(ele, {
      group: 'eventControlGroup',
      animation: 150,
      handle: '.ae-option-control-item-dragBar',
      ghostClass: 'ae-option-control-item--dragging',
      onEnd: (e: any) => {
        // 没有移动
        if (e.newIndex === e.oldIndex) {
          return;
        }
        // 换回来
        const parent = e.to as HTMLElement;
        if (
          e.newIndex < e.oldIndex &&
          e.oldIndex < parent.childNodes.length - 1
        ) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex + 1]);
        } else if (e.oldIndex < parent.childNodes.length - 1) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
        } else {
          parent.appendChild(e.item);
        }
        let onEventConfig = cloneDeep(this.state.onEvent);
        const newEvent = onEventConfig[eventKey];
        let options = newEvent?.actions.concat();
        // 从后往前移
        if (e.oldIndex > e.newIndex) {
          options = [
            ...options.slice(0, e.newIndex),
            options[e.oldIndex],
            ...options.slice(e.newIndex, e.oldIndex),
            ...options.slice(e.oldIndex + 1, options.length)
          ];
        } else if (e.oldIndex < e.newIndex) {
          // 从前往后
          options = [
            ...(e.oldIndex === 0 ? [] : options.slice(0, e.oldIndex)),
            ...options.slice(e.oldIndex + 1, e.newIndex),
            options[e.oldIndex],
            ...options.slice(e.newIndex, options.length)
          ];
        }
        onEventConfig[eventKey] = {
          ...onEventConfig[eventKey],
          actions: options
        };
        this.setState({
          onEvent: onEventConfig
        });
      }
    });
  }

  destroyDragging() {
    Object.keys(this.eventPanelSortMap).forEach((key: string) => {
      this.eventPanelSortMap[key]?.destroy();
    });
  }

  getEventVariables(
    activeData: Pick<
      EventControlState,
      'showAcionDialog' | 'type' | 'actionData'
    >
  ) {
    const {events, onEvent} = this.state;
    const {actionTree, pluginActions, commonActions, allComponents} =
      this.props;
    // 收集当前事件已有ajax动作的请求返回结果作为事件变量
    let oldActions = onEvent[activeData.actionData!.eventKey].actions;
    if (activeData.type === 'update') {
      // 编辑的时候只能拿到当前动作前面动作的事件变量
      oldActions = oldActions.slice(0, activeData.actionData!.actionIndex);
    }

    const withOutputVarActions = oldActions?.filter(item => item.outputVar);
    const withOutputVarVariables = withOutputVarActions?.map(
      (item: any, index: number) => {
        const actionLabel = getPropOfAcion(
          item,
          'actionLabel',
          actionTree,
          pluginActions,
          commonActions,
          allComponents
        );
        const dataSchemaJson = getPropOfAcion(
          item,
          'outputVarDataSchema',
          actionTree,
          pluginActions,
          commonActions,
          allComponents
        );
        const dataSchema = new DataSchema(dataSchemaJson || []);
        return {
          label: `${
            item.outputVar
              ? item.outputVar + `（${actionLabel}结果）`
              : `${actionLabel}结果`
          }`,
          tag: 'object',
          children: dataSchema.getDataPropsAsOptions()?.map(variable => ({
            ...variable,
            value: variable.value.replace('${outputVar}', item.outputVar)
          }))
        };
      }
    );
    const eventVariables: ContextVariables[] = [
      {
        label: '事件变量',
        children: withOutputVarVariables || []
      }
    ];
    const eventConfig = events.find(
      item => item.eventName === activeData.actionData!.eventKey
    );
    eventConfig?.dataSchema?.forEach((ds: any) => {
      const dataSchema = new DataSchema(ds || []);
      eventVariables[0].children = [
        ...eventVariables[0].children!,
        ...dataSchema.getDataPropsAsOptions()
      ];
    });
    return eventVariables;
  }

  // 唤起动作配置弹窗
  async activeActionDialog(
    data: Pick<EventControlState, 'showAcionDialog' | 'type' | 'actionData'>
  ) {
    const {
      actions: pluginActions,
      getContextSchemas,
      actionConfigInitFormatter,
      getComponents,
      actionTree,
      allComponents,
      manager
    } = this.props;

    let rawVariables = [];
    // 获取绑定事件的组件上下文变量
    if (getContextSchemas) {
      const dataSchemaIns = await getContextSchemas();
      rawVariables = dataSchemaIns?.getDataPropsAsOptions();
    }

    // 收集事件变量
    const eventVariables = this.getEventVariables(data);
    const appVariables: VariableItem[] =
      manager?.variableManager?.getVariableFormulaOptions() || [];
    const variables = [...eventVariables, ...rawVariables];
    const systemVarIndex = variables.findIndex(
      item => item.label === '系统变量'
    );

    // 插入应用变量
    if (!!~systemVarIndex) {
      appVariables.forEach(item => {
        if (Array.isArray(item?.children) && item.children.length) {
          variables.splice(systemVarIndex, 0, item);
        }
      });
    } else {
      appVariables.forEach(item => {
        if (Array.isArray(item?.children) && item.children.length) {
          variables.push(item);
        }
      });
    }
    variables.forEach(item => (item.selectMode = 'tree'));

    // 编辑操作，需要格式化动作配置
    if (data.type === 'update') {
      const action = data.actionData!.action!;
      const actionConfig = await actionConfigInitFormatter?.(action, {
        eventVariables,
        rawVariables
      });
      const actionNode = findActionNode(actionTree, actionConfig?.actionType!);
      const hasSubActionNode = findSubActionNode(actionTree, action.actionType);
      const supportComponents = getComponents(actionNode!);
      const node = findTree(
        supportComponents,
        item => item.value === action.componentId
      );

      // 获取组件数据动作所需上下文
      let setValueDs: any = null;
      if (
        actionConfig?.actionType === 'setValue' &&
        node?.id &&
        SELECT_PROPS_CONTAINER.includes(node?.type || '')
      ) {
        const targetDataSchema: any = await getContextSchemas?.(node.id, true);
        const targetDataSchemaIns = new DataSchema(targetDataSchema || []);
        const targetVariables =
          targetDataSchemaIns?.getDataPropsAsOptions() || [];

        setValueDs = targetVariables?.filter(
          (item: ContextVariables) => item.value !== '$$id'
        );
      }

      data.actionData = {
        eventKey: data.actionData!.eventKey,
        actionIndex: data.actionData!.actionIndex,
        variables,
        pluginActions,
        getContextSchemas,
        rawVariables,
        ...actionConfig,
        groupType: actionConfig?.__actionType || action.actionType,
        __actionDesc: actionNode!.description!, // 树节点描述
        __actionSchema: actionNode!.schema, // 树节点schema
        __subActions: hasSubActionNode?.actions, // 树节点子动作
        __cmptTreeSource: supportComponents ?? [],
        __superCmptTreeSource: allComponents,
        // __supersCmptTreeSource: '',
        __setValueDs: setValueDs
        // broadcastId: action.actionType === 'broadcast' ? action.eventName : ''
      };
      // 选中项自动滚动至可见位置
      setTimeout(
        () =>
          document
            .querySelector('.action-tree li .is-checked')
            ?.scrollIntoView(),
        0
      );
    } else {
      data.actionData = {
        eventKey: data.actionData!.eventKey,
        variables,
        pluginActions,
        getContextSchemas,
        rawVariables,
        __superCmptTreeSource: allComponents
      };
    }
    this.setState(data);
  }

  // 渲染描述信息
  renderDesc(action: ActionConfig) {
    const {
      actions: pluginActions,
      actionTree,
      commonActions,
      getComponents,
      allComponents
    } = this.props;
    const desc = getPropOfAcion(
      action,
      'descDetail',
      actionTree,
      pluginActions,
      commonActions,
      allComponents
    );
    let info = {...action};
    // 根据子动作类型获取动作树节点的配置
    const hasSubActionNode = findSubActionNode(actionTree, action.actionType);
    const actionType = getActionType(action, hasSubActionNode);
    const actionNode = actionType && findActionNode(actionTree, actionType);

    if (action.componentId && actionNode) {
      const supportComponents = getComponents(actionNode);
      const node = findTree(
        supportComponents,
        item => item.value === action.componentId
      );
      if (node) {
        info = {
          ...info,
          rendererLabel: node.label
        };
      }
    }

    return typeof desc === 'function' ? (
      <div className="action-control-content">{desc?.(info) || '-'}</div>
    ) : null;
  }

  @autobind
  onSubmit(type: string, config: any) {
    const {actionConfigSubmitFormatter} = this.props;
    const action = actionConfigSubmitFormatter?.(config) ?? config;
    if (type === 'add') {
      this.addAction?.(config.eventKey, action);
    } else if (type === 'update') {
      this.updateAction?.(config.eventKey, config.actionIndex, action);
    }

    this.setState({showAcionDialog: false});
    this.setState({actionData: undefined});
  }

  @autobind
  onClose() {
    this.setState({showAcionDialog: false});
  }

  render() {
    const {
      actionTree,
      actions: pluginActions,
      commonActions,
      getComponents,
      allComponents,
      render
    } = this.props;
    const {
      onEvent,
      events,
      eventPanelActive,
      showAcionDialog,
      showEventDialog,
      type,
      actionData,
      eventDialogData
    } = this.state;
    const eventSnapshot = cloneDeep(onEvent);
    const {showOldEntry} = this.props;
    const eventKeys = Object.keys(eventSnapshot);
    return (
      <div className="ae-event-control">
        <header
          className={cx({
            'ae-event-control-header': true,
            'ae-event-control-header-oldentry': showOldEntry,
            'no-bd-btm': !eventKeys.length
          })}
        >
          {render(
            'dropdown',
            {
              type: 'dropdown-button',
              level: 'enhance',
              label: '添加事件',
              disabled: false,
              className: 'block w-full add-event-dropdown',
              closeOnClick: true,
              buttons: events.map(item => ({
                type: 'button',
                disabledTip: '您已添加该事件',
                tooltipPlacement: 'left',
                disabled: Object.keys(onEvent).includes(item.eventName),
                actionType: '',
                label: item.eventLabel,
                onClick: this.addEvent.bind(
                  this,
                  item,
                  Object.keys(onEvent).includes(item.eventName)
                )
              }))
            },
            {
              popOverContainer: null // amis 渲染挂载节点会使用 this.target
            }
          )}
        </header>
        <ul
          className={cx({
            'ae-event-control-content': true,
            'ae-event-control-content-oldentry': showOldEntry
          })}
          ref={this.dragRef}
        >
          {eventKeys.length ? (
            eventKeys.map((eventKey, eventIndex) => {
              return (
                <li className="event-item" key={`content_${eventIndex}`}>
                  <div
                    className={cx({
                      'event-item-header': true,
                      'no-bd-btm':
                        !(
                          eventSnapshot[eventKey].actions?.length &&
                          eventPanelActive[eventKey]
                        ) && !getEventStrongDesc(events, eventKey)
                    })}
                  >
                    <TooltipWrapper
                      tooltipClassName="event-item-header-tip"
                      trigger="hover"
                      placement="top"
                      tooltip={{
                        children: () => (
                          <div>
                            {getEventDesc(events, eventKey) ||
                              getEventStrongDesc(events, eventKey) ||
                              eventKey}
                          </div>
                        )
                      }}
                    >
                      <div>{getEventLabel(events, eventKey) || eventKey}</div>
                    </TooltipWrapper>
                    <div className="event-item-header-toolbar">
                      <div
                        onClick={this.activeActionDialog.bind(this, {
                          showAcionDialog: true,
                          type: 'add',
                          actionData: {
                            eventKey
                          }
                        })}
                      >
                        <Icon className="icon" icon="add-btn" />
                      </div>
                      <div onClick={this.delEvent.bind(this, eventKey)}>
                        <Icon className="icon" icon="delete-bold-btn" />
                      </div>
                      <div
                        onClick={this.activeEventDialog.bind(this, {
                          eventName: eventKey,
                          eventLabel:
                            getEventLabel(events, eventKey) || eventKey,
                          ...eventSnapshot[eventKey]
                        })}
                      >
                        <Icon className="icon" icon="event-setting" />
                      </div>
                      <div
                        onClick={this.toggleActivePanel.bind(this, eventKey)}
                      >
                        {eventPanelActive[eventKey] ? (
                          <Icon className="icon" icon="open-btn-r" />
                        ) : (
                          <Icon className="icon" icon="close-btn" />
                        )}
                      </div>
                    </div>
                  </div>
                  {getEventStrongDesc(events, eventKey)
                    ? render('alert', {
                        type: 'alert',
                        body:
                          '温馨提示：' + getEventStrongDesc(events, eventKey),
                        level: 'info',
                        showCloseButton: true,
                        showIcon: true,
                        className: 'event-item-desc'
                      })
                    : null}
                  {eventSnapshot[eventKey].actions.length &&
                  eventPanelActive[eventKey] ? (
                    <ul className="item-content">
                      {eventSnapshot[eventKey].actions.map(
                        (action, actionIndex) => {
                          return (
                            <li
                              className="ae-option-control-item"
                              key={`item-content_${actionIndex}`}
                            >
                              <div className="action-control-header">
                                <div className="action-control-header-left">
                                  <div className="ae-option-control-item-dragBar">
                                    <Icon
                                      icon="drag-six-circle-btn"
                                      className="icon"
                                    />
                                  </div>
                                  <div className="action-item-actiontype">
                                    {getPropOfAcion(
                                      action,
                                      'actionLabel',
                                      actionTree,
                                      pluginActions,
                                      commonActions,
                                      allComponents
                                    ) || action.actionType}
                                  </div>
                                </div>
                                <div className="action-control-header-right">
                                  <div
                                    onClick={this.activeActionDialog.bind(
                                      this,
                                      {
                                        showAcionDialog: true,
                                        type: 'update',
                                        actionData: {
                                          action,
                                          eventKey,
                                          actionIndex
                                        }
                                      }
                                    )}
                                  >
                                    <Icon
                                      className="icon"
                                      icon="edit-full-btn"
                                    />
                                  </div>
                                  <div
                                    onClick={this.delAction.bind(
                                      this,
                                      eventKey,
                                      action,
                                      actionIndex
                                    )}
                                  >
                                    <Icon
                                      className="icon"
                                      icon="delete-easy-btn"
                                    />
                                  </div>
                                </div>
                              </div>
                              {this.renderDesc(action)}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  ) : null}
                </li>
              );
            })
          ) : (
            <div className="ae-event-control-placeholder">
              {/* 翻译未生效，临时方案 */}
              {_i18n('4db5110d41293fef57f5a1f364187896')}
            </div>
          )}
        </ul>
        {showEventDialog
          ? amisRender(
              {
                type: 'dialog',
                title: `${eventDialogData?.eventLabel}-事件配置`,
                showCloseButton: false,
                body: [
                  {
                    type: 'form',
                    title: '表单',
                    data: {
                      '&': '$$'
                    },
                    mode: 'horizontal',
                    horizontal: {
                      left: 3,
                      right: 9
                    },
                    body: [
                      {
                        label: '事件防重',
                        type: 'switch',
                        name: 'debounce.open',
                        description:
                          '开启事件防重后，防重时间内多次触发事件只会执行最后一次'
                      },
                      {
                        label: '防重时间',
                        required: true,
                        hiddenOn: '!debounce.open',
                        name: 'debounce.wait',
                        suffix: 'ms',
                        max: 10000,
                        min: 0,
                        type: 'input-number'
                      }
                    ],
                    onSubmit: this.eventDialogSubmit.bind(this)
                  }
                ],
                actions: [
                  {
                    type: 'button',
                    label: '取消',
                    onEvent: {
                      click: {
                        actions: [
                          {
                            actionType: 'custom',
                            script: () => {
                              this.setState({
                                showEventDialog: false
                              });
                            }
                          }
                        ]
                      }
                    }
                  },
                  {
                    type: 'button',
                    actionType: 'confirm',
                    label: '确认',
                    primary: true
                  }
                ]
              },
              {
                data: eventDialogData
              }
            )
          : null}
        <ActionDialog
          show={showAcionDialog}
          type={type}
          actionTree={actionTree}
          pluginActions={pluginActions}
          commonActions={commonActions}
          getComponents={getComponents}
          data={actionData}
          onSubmit={this.onSubmit}
          onClose={this.onClose}
          render={this.props.render}
        />
      </div>
    );
  }
}

@FormItem({
  type: 'ae-eventControl'
})
export class EventControlRenderer extends EventControl {}
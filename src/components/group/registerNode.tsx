import { h } from 'vue'
import { Graph } from '@antv/x6'
import GroupHeader from './GroupHeader'

export const defaultViewId = 'antv-group-teleport-view'

Graph.registerNode('group-header', {
  inherit: 'vue-shape',
  view: defaultViewId,
  x: 0,
  y: 0,
  width: 248,
  height: 48,
  component: {
    render: () => h(GroupHeader),
  },
})

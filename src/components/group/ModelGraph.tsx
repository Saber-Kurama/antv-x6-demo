import { defineComponent, h } from 'vue'
import type { Model } from '@antv/x6'
import { Cell, Graph, Node, Path } from '@antv/x6'
// import { useTeleport } from '@antv/x6-vue-shape'
// import { useTeleport } from 'antv-x6-vue-teleport-view'
import Hierarchy from '@antv/hierarchy'
// import categoryData from '../../data/algorithm-category.json'
import vueShape, { useTeleport } from '@antv/x6-vue-shape'
import SourceNode from './SourceNode'
import './registerNode'
import { getJSONData } from './groupData'
// interface HierarchyResult {
//   id: number
//   x: number
//   y: number
//   children: HierarchyResult[]
// }

const defaultViewId = 'antv-group-teleport-view'

// 注册一个自定义组件
Graph.registerNode('source-node', {
  inherit: 'vue-shape',
  view: defaultViewId,
  x: 0,
  y: 0,
  width: 248,
  height: 36,
  component: {
    render: () => h(SourceNode),
  },
})
// Graph.registerNode('group-header', {
//   inherit: 'vue-shape',
//   view: defaultViewId,
//   x: 0,
//   y: 0,
//   width: 248,
//   height: 36,
//   component: {
//     render: () => h(SourceNode),
//   },
// })

Graph.registerEdge(
  'group-edge',
  {
    inherit: 'edge',
    attrs: {
      line: {
        stroke: '#9098A9',
        strokeWidth: 1,
        sourceMarker: {
          name: 'circle',
          r: 3,
        },
        targetMarker: {
          name: 'circle',
          r: 3,
        },
      },
    },
  },
  true,
)
// 这个是为了提升自定义节点渲染性能的
const TeleportContainer = useTeleport(defaultViewId)

export default defineComponent({
  name: 'ModelGraph',
  // components: {
  //   TeleportContainer,
  // },
  setup: (props, { slots, attrs, emit }) => {
    const data = {
      // 节点
      nodes: [
        {
          id: 'node1', // String，可选，节点的唯一标识
          x: 40, // Number，必选，节点位置的 x 值
          y: 40, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: 'hello', // String，节点标签
        },
        {
          id: 'node2', // String，节点的唯一标识
          x: 160, // Number，必选，节点位置的 x 值
          y: 180, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: 'world', // String，节点标签
        },
      ],
      // 边
      edges: [
        {
          source: 'node1', // String，必须，起始节点 id
          target: 'node2', // String，必须，目标节点 id
        },
      ],
    }
    const domRef = ref()
    // todo: 是否需要 ref
    const graph = ref()

    const initGraph = () => {
      if (domRef.value && !graph.value) {
        graph.value = new Graph({
          container: domRef.value,
          grid: {
            size: 10,
            visible: true,
            type: 'dot', // 'dot' | 'fixedDot' | 'mesh'
            args: {
              color: '#a05410', // 网格线/点颜色
              thickness: 1, // 网格线宽度/网格点大小
            },
          },
          interacting: {
            nodeMovable: false,
          },
          panning: {
            enabled: true,
            eventTypes: ['leftMouseDown', 'mouseWheel'],
          },
          mousewheel: {
            enabled: true,
            modifiers: 'ctrl',
            factor: 1.1,
            maxScale: 1.5,
            minScale: 0.5,
          },
        })
        const datajosn = getJSONData()
        graph.value.fromJSON(datajosn)
        graph.value.on('edge:mouseenter', ({ edge }: any) => {
          edge.attr('line/stroke', 'orange')
        })
        graph.value.on('edge:mouseleave', ({ edge }: any) => {
          edge.attr('line/stroke', '#9098A9')
        })
      }
    }
    onMounted(() => {
      initGraph()
    })
    // eslint-disable-next-line react/display-name
    return () => {
      return (
        <div style={{ height: '800px' }}>
          <TeleportContainer />
          <div ref={domRef} style={{ width: '100%', height: '800px' }}></div>
        </div>

      )
    }
  },
})

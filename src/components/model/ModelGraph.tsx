import { defineComponent, h } from 'vue'
import type { Model } from '@antv/x6'
import { Cell, Graph, Node, Path } from '@antv/x6'


// import { useTeleport } from '@antv/x6-vue-shape'
import { useTeleport } from 'antv-x6-vue-teleport-view'
import Hierarchy from '@antv/hierarchy'
import categoryData from '../../data/algorithm-category.json'
import Entity from './Entity'
import '@antv/x6-vue-shape'

import { register } from '../x6-html-shape/index'
// import createRender from 'x6-html-shape/dist/teleport'


import createRender from '../x6-html-shape/vue'

const render = createRender(Entity)

// const render = createRender(Component)

register({
  shape: 'vue3-node',
  render,
  width: 100,
  height: 40,
})

interface HierarchyResult {
  id: number
  x: number
  y: number
  children: HierarchyResult[]
}

// const defaultViewId = 'antv-x6-vue-teleport-view'

// // 注册一个自定义组件
// Graph.registerNode('entity', {
//   inherit: 'vue-shape',
//   view: defaultViewId,
//   x: 200,
//   y: 150,
//   width: 190,
//   height: 80,
//   component: {
//     render: () => h(Entity),
//   },
// })

// 这个是为了提升自定义节点渲染性能的
// const TeleportContainer = useTeleport(defaultViewId)
// 连接器
Graph.registerConnector(
  'mindmap',
  (sourcePoint, targetPoint, routerPoints, options) => {
    const midX = sourcePoint.x + 0
    const midY = sourcePoint.y
    const ctrX = (targetPoint.x - midX) / 5 + midX
    const ctrY = targetPoint.y
    const pathData = `
     M ${sourcePoint.x} ${sourcePoint.y}
     L ${midX} ${midY}
     Q ${ctrX} ${ctrY} ${targetPoint.x} ${targetPoint.y}
    `
    return options.raw ? Path.parse(pathData) : pathData
  },
  true,
)

// 边
Graph.registerEdge(
  'mindmap-edge',
  {
    inherit: 'edge',
    connector: {
      name: 'mindmap',
    },
    attrs: {
      line: {
        // targetMarker: ,
        stroke: '#3C6EFF ',
        strokeWidth: 1,
        strokeDasharray: 5,
      },
    },
    zIndex: 0,
  },
  true,
)
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
        // graph.value.fromJSON(data)
        const result = Hierarchy.mindmap(categoryData, {
          direction: 'H',
          getHeight() {
            return 80
          },
          getWidth() {
            return 190
          },
          getHGap() {
            return 80
          },
          getVGap() {
            return 44
          },
          getSide: () => {
            return 'right'
          },
        })
        const model: Model.FromJSONData = { nodes: [], edges: [] }
        const traverse = (data: HierarchyResult) => {
          if (data) {
            model.nodes?.push({
              id: `${data.id}`,
              x: data.x,
              y: data.y,
              // shape: 'entity',
              shape: 'vue3-node',
              width: 190,
              height: 80,
              attrs: {
                body: {
                  fill: '#5F95FF',
                  stroke: 'transparent',
                },
              },
            })
          }
          if (data.children) {
            data.children.forEach((item: HierarchyResult) => {
              console.log('item---', item)
              model.edges?.push({
                shape: 'mindmap-edge',
                // source: `${data.id}`,
                source: {
                  cell: `${data.id}`,
                  anchor:
                  {
                    name: 'right',
                    args: {
                      // dx: -16,
                    },
                  },
                },
                target: {
                  cell: `${item.id}`,
                  anchor:
                  {
                    name: 'left',
                    // args: {
                    //   dx: -16,
                    // },
                  },
                },
                // target: `${item.id}`,

                // vertices: [{ x: item.x + 250 - 46, y: item.y + 250 + 8 }],
                // connector: { name: 'smooth' },
                // router: { name: 'er' },
                // router: {
                //   name: 'oneSide',
                //   args: {
                //     padding: {
                //       left: 0,
                //     },
                //   },
                // },
                // attrs: {
                //   line: {
                //     stroke: '#A2B1C3',
                //     strokeWidth: 1,
                //     // targetMarker: null,
                //   },
                // },
              })
              traverse(item)
            })
          }
        }
        traverse(result)
        console.log('result', result)
        graph.value.fromJSON(model)
      }
    }
    onMounted(() => {
      initGraph()
    })
    // eslint-disable-next-line react/display-name
    return () => {
      return (
        <div style={{ height: '800px' }}>
          {/* <TeleportContainer /> */}
          <div ref={domRef} style={{ width: '100%', height: '800px' }}></div>
        </div>

      )
    }
  },
})

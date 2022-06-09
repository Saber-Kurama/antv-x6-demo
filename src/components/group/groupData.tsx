const sourceData = {
  parent: {
    point: {
      x: 40,
      y: 40,
    },
    height: 200,
  },
  width: 248,
  height: 36,
  header: {
    height: 48,
  },
}

const targetData = {
  parent: {
    point: {
      x: 400,
      y: 40,
    },
    height: 200,
  },
  width: 248,
  height: 36,
  header: {
    height: 48,
  },
}

const sourceParent = {
  x: sourceData.parent.point.x,
  y: sourceData.parent.point.y,
  width: sourceData.width,
  height: sourceData.parent.height,
  // height: souresList.length * sourceData.height + sourceData.header.height + 3,
  zIndex: 1,
  label: '',
  attrs: {
    body: {
      fill: '#ffffff',
      stroke: '#E8EBF2',
      strokeWidth: 1,
      rx: 3,
      ry: 3,
    },
  },
}
const sourceHeader = {
  id: 'source-header',
  x: sourceData.parent.point.x,
  y: sourceData.parent.point.y,
  width: sourceData.width,
  height: sourceData.header.height,
  shape: 'group-header',
}

const targetParent = {
  x: targetData.parent.point.x,
  y: targetData.parent.point.y,
  width: targetData.width,
  height: targetData.parent.height,
  // height: souresList.length * sourceData.height + sourceData.header.height + 3,
  zIndex: 1,
  label: '',
  attrs: {
    body: {
      fill: '#ffffff',
      stroke: '#E8EBF2',
      strokeWidth: 1,
      rx: 3,
      ry: 3,
    },
  },
}

const targetHeader = {
  id: 'target-header',
  x: targetData.parent.point.x,
  y: targetData.parent.point.y,
  width: targetData.width,
  height: targetData.header.height,
  shape: 'group-header',
}

export const getJSONData = () => {
  let nodes: any[] = []
  const edges: any[] = []
  const souresList: any[] = [
    {
      id: 's1',
    },
    {
      id: 's2',
    },
    {
      id: 's3',
    },
    {
      id: 's4',
    },
  ]
  const targetList: any[] = [
    {
      id: 't1',
    },
  ]
  const sourceNodeIds: string[] = []
  // attrs: {
  //   fo: {
  //     width: 12,
  //     height: 12,
  //     x: -6,
  //     y: -6,
  //     magnet: 'true',
  //   },
  // },
  const sourceNodes = souresList.map((d, index) => {
    sourceNodeIds.push(d.id)
    return {
      id: d.id,
      x: sourceData.parent.point.x,
      y: sourceData.parent.point.y + sourceData.header.height + index * sourceData.height,
      width: sourceData.width,
      height: sourceData.height,
      shape: 'source-node',
      ports: {
        groups: {
          group1: {
            position: {
              name: 'right',
            },
            attrs: {
              circle: {
                r: 0,
                stroke: '#31d0c6',
                strokeWidth: 1,
                fill: '#fff',
              },
            },
          },
        },
        items: [
          {
            id: 'port',
            group: 'group1',
            args: {
              dx: -4,
            },
          },
        ],
      },
    }
  })
  const targetNodeIds: string[] = []
  const targetNodes = targetList.map((d, index) => {
    targetNodeIds.push(d.id)
    return {
      id: d.id,
      x: targetData.parent.point.x,
      y: targetData.parent.point.y + targetData.header.height + index * targetData.height,
      width: targetData.width,
      height: targetData.height,
      shape: 'source-node',
      ports: {
        groups: {
          group1: {
            position: {
              name: 'left',
            },
            attrs: {
              circle: {
                r: 0,
                stroke: '#31d0c6',
                strokeWidth: 1,
                fill: '#fff',
              },
            },
          },
        },
        items: [
          {
            id: 'port',
            group: 'group1',
            args: {
              dx: 4,
            },
          },
        ],
      },
    }
  })
  sourceParent.height = souresList.length * sourceData.height + sourceData.header.height + 3
  sourceParent.children = ['source-header'].concat(sourceNodeIds)
  nodes.push(sourceParent)
  nodes.push(sourceHeader)
  nodes = nodes.concat(sourceNodes)
  targetParent.children = ['target-header'].concat(targetNodeIds)
  nodes.push(targetParent)
  nodes.push(targetHeader)
  nodes = nodes.concat(targetNodes)
  edges.push({
    source: {
      cell: 's2',
      port: 'port',
    },
    target: {
      cell: 't1',
      port: 'port',
    },
    shape: 'group-edge',
    connector: 'smooth',
  })
  return {
    nodes,
    edges,
  }
}

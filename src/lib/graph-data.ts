// Graph data structure - maps existing content to spatial nodes

import { personalInfo, projects, experiences, publications, achievements } from './data'

export type NodeType = 'person' | 'category' | 'item'

export interface GraphNode {
  id: string
  type: NodeType
  label: string
  sublabel?: string
  position: { x: number; y: number }
  data?: {
    source: 'personalInfo' | 'project' | 'experience' | 'publication' | 'achievement'
    index?: number
  }
}

export interface GraphEdge {
  from: string
  to: string
  type: 'primary' | 'secondary' // primary = direct hierarchy, secondary = cross-link
}

// Manual positions for intentional spatial storytelling
// Center is (0, 0), units are pixels at scale 1
export const graphNodes: GraphNode[] = [
  // Central person node
  {
    id: 'me',
    type: 'person',
    label: personalInfo.name,
    sublabel: 'Researcher & Engineer',
    position: { x: 0, y: 0 },
    data: { source: 'personalInfo' }
  },

  // Category nodes - arranged in a loose diamond around center
  {
    id: 'experience',
    type: 'category',
    label: 'Experience',
    sublabel: `${experiences.length} roles`,
    position: { x: -380, y: -120 }
  },
  {
    id: 'projects',
    type: 'category',
    label: 'Research',
    sublabel: `${projects.length} projects`,
    position: { x: 380, y: -120 }
  },
  {
    id: 'publications',
    type: 'category',
    label: 'Publications',
    sublabel: `${publications.length} papers`,
    position: { x: 0, y: -340 }
  },
  {
    id: 'achievements',
    type: 'category',
    label: 'Recognition',
    sublabel: `${achievements.length} awards`,
    position: { x: 0, y: 320 }
  },

  // Experience item nodes - fanned out from experience category
  ...experiences.map((exp, i) => ({
    id: exp.id,
    type: 'item' as NodeType,
    label: exp.organization,
    sublabel: exp.title,
    position: {
      x: -650 - (i % 2) * 80,
      y: -280 + i * 120
    },
    data: { source: 'experience' as const, index: i }
  })),

  // Project item nodes - fanned out from projects category
  ...projects.map((proj, i) => ({
    id: proj.id,
    type: 'item' as NodeType,
    label: proj.title.length > 25 ? proj.title.slice(0, 22) + '...' : proj.title,
    sublabel: proj.organization.split(' ').slice(0, 3).join(' '),
    position: {
      x: 620 + (i % 2) * 80,
      y: -220 + i * 140
    },
    data: { source: 'project' as const, index: i }
  })),

  // Publication item nodes - arranged above publications category
  ...publications.map((pub, i) => ({
    id: pub.id,
    type: 'item' as NodeType,
    label: pub.title.length > 30 ? pub.title.slice(0, 27) + '...' : pub.title,
    sublabel: pub.type,
    position: {
      x: -280 + i * 280,
      y: -520
    },
    data: { source: 'publication' as const, index: i }
  }))
]

// Define connections between nodes
export const graphEdges: GraphEdge[] = [
  // Central connections
  { from: 'me', to: 'experience', type: 'primary' },
  { from: 'me', to: 'projects', type: 'primary' },
  { from: 'me', to: 'publications', type: 'primary' },
  { from: 'me', to: 'achievements', type: 'primary' },

  // Experience hierarchy
  ...experiences.map(exp => ({
    from: 'experience',
    to: exp.id,
    type: 'primary' as const
  })),

  // Projects hierarchy
  ...projects.map(proj => ({
    from: 'projects',
    to: proj.id,
    type: 'primary' as const
  })),

  // Publications hierarchy
  ...publications.map(pub => ({
    from: 'publications',
    to: pub.id,
    type: 'primary' as const
  })),

  // Cross-links (research connections)
  { from: 'transparent-reasoning', to: 'socialnli', type: 'secondary' },
  { from: 'surgisimulate', to: 'surgisimulate-paper', type: 'secondary' },
  { from: 'amazon-agi', to: 'qaagent', type: 'secondary' }
]

// Helper to get node by ID
export function getNode(id: string): GraphNode | undefined {
  return graphNodes.find(n => n.id === id)
}

// Helper to get connected node IDs
export function getConnectedNodes(nodeId: string): string[] {
  const connected = new Set<string>()
  graphEdges.forEach(edge => {
    if (edge.from === nodeId) connected.add(edge.to)
    if (edge.to === nodeId) connected.add(edge.from)
  })
  return Array.from(connected)
}

// Helper to get edges connected to a node
export function getConnectedEdges(nodeId: string): GraphEdge[] {
  return graphEdges.filter(edge => edge.from === nodeId || edge.to === nodeId)
}

// Get full content data for a node
export function getNodeContent(nodeId: string) {
  const node = getNode(nodeId)
  if (!node?.data) return null

  switch (node.data.source) {
    case 'personalInfo':
      return { type: 'person', data: personalInfo }
    case 'experience':
      return { type: 'experience', data: experiences[node.data.index!] }
    case 'project':
      return { type: 'project', data: projects[node.data.index!] }
    case 'publication':
      return { type: 'publication', data: publications[node.data.index!] }
    default:
      return null
  }
}

// Story page scroll sequence - ordered narrative flow
export const storySequence = [
  'me',
  'experience',
  'aws-2025',
  'amazon-agi',
  'scale-ai',
  'quantable',
  'paypal',
  'projects',
  'transparent-reasoning',
  'nuss-bar',
  'surgisimulate',
  'publications',
  'socialnli',
  'qaagent',
  'surgisimulate-paper',
  'achievements'
]

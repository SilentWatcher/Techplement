import ProjectOneLayout from '../designs/project-1/PortfolioLayout.jsx'

export const designs = {
  'project-1': {
    id: 'project-1',
    name: 'Project 1 — Dark HUD',
    component: ProjectOneLayout,
  },
}

export function getDesign(designId) {
  return designs[designId] || designs['project-1']
}

export function designOptions() {
  return Object.values(designs).map(({ id, name }) => ({ id, name }))
}

import { Sidebar } from './Sidebar'

type DashboardProps = {
  id: string
}

export function Dashboard({ id }: DashboardProps) {
  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <Sidebar id={id} />
    </div>
  )
}

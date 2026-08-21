import { useNavigate } from 'react-router-dom'
import { Compass, ArrowLeft } from 'lucide-react'
import { Button, Card, EmptyState } from '@/components/ui'

export function NotFound() {
  const navigate = useNavigate()
  return (
    <Card className="mt-10">
      <EmptyState
        icon={<Compass size={20} />}
        title="This page does not exist"
        description="The link may be out of date, or the record may have been archived. Everything else in the workspace is still available from the sidebar."
        action={
          <Button variant="primary" icon={<ArrowLeft size={14} />} onClick={() => navigate('/dashboard')}>
            Back to dashboard
          </Button>
        }
      />
    </Card>
  )
}

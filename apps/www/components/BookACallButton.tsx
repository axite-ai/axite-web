'use client'

import { useEffect } from 'react'
import { getCalApi } from '@calcom/embed-react'
import { Button } from 'ui'

interface BookACallButtonProps {
  size?: 'medium' | 'small' | 'large'
  type?: 'primary' | 'default'
}

const BookACallButton = ({ size, type = 'default' }: BookACallButtonProps) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'discovery' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  return (
    <Button
      size={size}
      type={type}
      data-cal-namespace="discovery"
      data-cal-link="axite/discovery"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
    >
      Book a Call
    </Button>
  )
}

export default BookACallButton

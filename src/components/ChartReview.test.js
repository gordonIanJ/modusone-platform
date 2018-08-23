import React from 'react'
import { render } from 'react-testing-library'
import ChartReview from './ChartReview'

const props = { header: 'Chart Review' }

describe('ChartReview', () => {
  it('renders the ChartReview', () => {
    const { queryByText } = render(<ChartReview {...props} />)
    const header = queryByText('Chart Review')
    expect(header.innerHTML).toBe('Chart Review')
  })
})

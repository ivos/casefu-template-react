import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { useTimeout } from 'react-use'
import { skeletonDelay } from './constants'

export const SkeletonTableRows = ({ columns }) => {
  const [show] = useTimeout(skeletonDelay)
  return show() && [...Array(3)]
    .map((_, row) => (
      <tr key={row}>
        {
          [...Array(columns)]
            .map((_, column) => (
              <td key={column}>
                <Skeleton/>
              </td>
            ))
        }
      </tr>
    ))
}

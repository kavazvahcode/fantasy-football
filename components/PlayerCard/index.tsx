'use client'

import React from 'react'
import Image from 'next/image'
import type { SlatePlayer } from '@/types/fantasy-football'

interface PlayerCardProps {
  player: SlatePlayer | null
}

const PlayerCard = ({ player }: PlayerCardProps) => {
  if (!player) {
    return (
      <div className="w-full h-full">
        <div className="bg-slate-gray rounded-lg p-6 text-center h-full flex items-center justify-center">
          <div className="text-text-secondary text-lg">
            Select a player from the table to view details
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      {/* Player Image Placeholder */}
      <div className="w-full h-64 xl:h-80 rounded-t-lg overflow-hidden">
        <Image
          src="/player-placeholder.jpg"
          alt="Player Image"
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Player Details  */}
      <div className="bg-slate-gray rounded-b-lg p-4 xl:p-6 flex-1">
        {/* Player Name */}
        <h2 className="text-text-secondary text-2xl xl:text-3xl mb-4 text-center">
          {player.operatorPlayerName}
        </h2>

        {/* Points */}
        <div className="text-center">
          <div className="text-text-secondary text-6xl xl:text-8xl mt-6 leading-none">
            {player.fantasyPoints || 0}
          </div>
          <div className="text-text-secondary text-base mb-5">Points</div>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard

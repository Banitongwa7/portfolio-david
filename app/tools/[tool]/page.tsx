import React from 'react'

export default async function ToolItem({
    params,
  }: {
    params: Promise<{ tool: string }>;
  }) {
    const slug = (await params).tool;

    if (slug === "tool1") {
        return (
            <div className='h-screen text-center text-3xl font-bold text-white'>Tool 1</div>
        )
    }else if (slug === "tool2") {
        return (
            <div className='h-screen text-center text-3xl font-bold text-white'>Tool 2</div>
        )
    }
    else if (slug === "tool3") {
        return (
            <div className='h-screen text-center text-3xl font-bold text-white'>Tool 3</div>
        )
    }
}

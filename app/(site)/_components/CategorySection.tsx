import { categoriesIcon } from '@/constant'
import { prisma } from '@/prisma/client'
import Link from 'next/link'
import React from 'react'

const CategorySection = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      sortOrder: 'asc',
    },
  })
  return (
    <section className="bg-muted/50 w-full py-12 md:py-16 lg:py-24">
      <div className="container mx-auto max-w-screen-xl px-4 md:px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Browse Events by Category
            </h2>
            <p className="text-foreground max-w-[900px] md:text-xl">
              Discover events that match your interests and passions
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 grid grid-cols-2 justify-center gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {categories.map(({ name, slug }) => (
            <Link
              key={name}
              href={`/events?category=${slug}`}
              className="group hover:border-primary bg-background relative overflow-hidden rounded-lg border p-2 transition-colors"
            >
              <div className="flex h-[100px] flex-col items-center justify-center p-4 text-center">
                <div className="bg-muted/50 group-hover:bg-primary/10 mb-2 rounded-full p-3 transition-colors">
                  {(() => {
                    const Icon = getIconByCategoryName(name)
                    return Icon ? <Icon /> : null
                  })()}
                </div>
                <h3 className="text-base font-semibold">{name}</h3>
                {/* <p className="text-sm text-muted-foreground">{count} Events</p> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

const getIconByCategoryName = (name: string) => {
  return categoriesIcon.find(
    (cat) => cat.name.toLowerCase() == name.toLowerCase(),
  )?.icon
}

export default CategorySection

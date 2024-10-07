"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Home, House } from "lucide-react"
import { usePathname } from "next/navigation"

const Navigation = () => {
  const path = usePathname()
  const pages = path.split("/")

  return (
    <>
      {path !== "/" &&
        <Breadcrumb>
          <BreadcrumbList>
            {pages.map((page, i) => (
              <div key={`breadcrumb-${i}`} className="flex items-center space-x-3">
                <BreadcrumbItem >
                  <BreadcrumbLink href={`/${page}`}>
                    {i === 0 ? <House className="w-4 h-4" /> : page}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {(path.length > i + 1) && <BreadcrumbSeparator />}
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      }
    </>
  )

}

export default Navigation

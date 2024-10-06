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
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${page}`}>
                    {i === 0 ? <House className="w-4 h-4" /> : page}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {(path.length > i + 1) && <BreadcrumbSeparator />}

              </>

            ))}
          </BreadcrumbList>
        </Breadcrumb>
      }
    </>
  )

}

export default Navigation

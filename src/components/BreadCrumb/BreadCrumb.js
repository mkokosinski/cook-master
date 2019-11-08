import React from 'react'
import styles from "./BreadCrumb.module.scss"
import BreadcrumbConfig from "auto-breadcrumb"
import { Breadcrumb } from "antd"
import { Link } from "gatsby"


const Breadcrumbs = BreadcrumbConfig({
    staticRoutesMap: {
      "/": "Strona główna",
    },
    dynamicRoutesMap: {
      "/:id": ({ id }) => id,
      "/:idd/:id": ({ idd, id }) => id,
    },
    Breadcrumb,
    BreadcrumbItem: Breadcrumb.Item,
    containerProps: {
      separator: ">",
      className: styles.breadcrumb
    },
    itemRender:  (name, path) =>
      path ? (
        <Link className={styles.breadcrumbItem} to={"app/" + path}>
          {decodeURI(name)}
        </Link>
      ) : (
        <span className={styles.breadcrumbItem}>{decodeURI(name)}</span>
      ),
  })

const BreadCrumb = ({pathname}) => {
    const path = pathname.replace('app/','') 
    return <Breadcrumbs pathname={path}/>
}

export default BreadCrumb

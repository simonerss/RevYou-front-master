import React from "react";
import { Route, Link } from "react-router-dom";
import appRoutes from "../router/appRouter";
import {  Breadcrumb, Layout } from "antd";
import Header from "./Header";
import Sider from "./Sider";
import Footer from "./Footer";
import "./Layout.css";
import BreadcrumbConfig from "auto-breadcrumb";

const Breadcrumbs = BreadcrumbConfig({
  staticRoutesMap: {
    "/home": "HOME"
  },
  dynamicRoutesMap: {
    "/:id": ({ id }) => `${id.toUpperCase()}`,
    "/:idd/:id": ["", ({ id, idd }) => `${id.toUpperCase()}`], //`${idd} ${id}`]
    "/:iddd/:idd/:id": ({ iddd, idd, id }) => `${iddd},${idd},${id}`
  },
  Breadcrumb,
  BreadcrumbItem: Breadcrumb.Item,
  containerProps: {
    separator: "/"
  },
  itemRender: (name, path) => (path ? <Link to={path}>{name}</Link> : `${name}`)
});

const { Content } = Layout;
const Layouts = () => (
    <Layout>
      <Header />
      <Layout>
        <Sider />

        <Route
          render={({ location }) => {
            return (
              <Layout style={{ padding: "0 24px 24px" }}>
                <Breadcrumbs pathname={location.pathname}  style={{
                  padding: 10,
                  background: "#e0e"
                }}/>

                <Content
                  style={{
                    background: "#fff",
                    padding: 24,
                    margin: 0,
                    minHeight: 580
                  }}
                >
                  {appRoutes.map(route => (
                    <Route
                      key={route.path}
                      path={route.path}
                      component={route.component}
                      exact={route.exact}
                    />
                  ))}
                </Content>
              </Layout>
            );
          }}
        />
      </Layout>
      <Footer />
    </Layout>
);

export default Layouts;

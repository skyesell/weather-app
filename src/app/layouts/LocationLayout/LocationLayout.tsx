import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../../store/store";
import { addCurrentWeather, deleteLocation } from "../../../shared/actions";
import { currentLocationId, LocationT } from "../../../entities/location/model";
import { RenameLocationModal } from "../../../features/location/ui/RenameLocationModal/RenameLocationModal";
import { setOpenModal } from "../model";
import { AddNewLocationForm } from "../../../features/location/ui/AddNewLocationForm/AddNewLocationForm";
import s from "./styles.module.scss";

const { Header, Content, Footer, Sider } = Layout;

export const LocationLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useAppDispatch();

  const { locationsList, geoLocation } = useSelector((state: RootState) => state.location);
  const { open } = useSelector((state: RootState) => state.modal);

  const locations = [geoLocation].concat(locationsList) as LocationT[];

  return (
    <Layout hasSider>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ height: 32, margin: "16px 16px 0 16px", color: "#fff", display: "flex" }}>
          <h4>Сохраненные локации</h4>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={locations?.map((item, key) => ({
            key: `/${item?.id ?? ""}`,
            icon: <div>-</div>,
            label: (
              <div className={s.label}>
                <p>{item?.name}</p>
                <div className={s.buttons}>
                  {item?.id ? (
                    <>
                      <button
                        className={s.delete}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(currentLocationId({ id: item?.id }));
                          dispatch(setOpenModal(true));
                        }}
                      >
                        <img src={"/weather-app/icons/pencil.svg"} />
                      </button>
                      <button
                        className={s.delete}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(deleteLocation(item?.id));
                        }}
                      >
                        <img src={"/weather-app/icons/delete.svg"} />
                      </button>

                      <RenameLocationModal isModalOpen={open} />
                    </>
                  ) : null}{" "}
                </div>
              </div>
            ),
            onClick: () => {
              dispatch(addCurrentWeather({ lat: +item.lat, lon: +item.lon }));
            },
          }))}
        />
      </Sider>
      <Layout className="site-layout" style={{ height: "100vh", minWidth: "360px" }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <AddNewLocationForm />
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>Weather App ©2023 Created by Ant UED & Alina Petrova</Footer>
      </Layout>
    </Layout>
  );
};

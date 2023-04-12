import React, { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { AddNewLocationForm } from "../../../features/location/ui/AddNewLocationForm/AddNewLocationForm";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { addCurrentWeather, deleteLocation } from "../../../shared/actions";
import { currentLocationId, LocationT } from "../../../entities/location/model";
import s from "./styles.module.scss";
import { RenameLocationModal } from "../../../features/location/ui/AddNewLocationForm/RenameLocationModal/RenameLocationModal";
import { setOpenModal } from "../model";
interface MainLayoutProps {
  children?: ReactNode;
}

const { Header, Content, Footer, Sider } = Layout;

export const LocationLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { locationsList, geoLocation } = useSelector((state: RootState) => state.location);
  const { open } = useSelector((state: RootState) => state.modal);
  const locations = [geoLocation].concat(locationsList) as LocationT[];
  console.log(open, "open");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ height: 32, margin: "16px 16px 0 16px", color: "#fff", display: "flex" }}>
          <h4>Сохраненные локации</h4>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
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
                        onClick={() => {
                          dispatch(currentLocationId({ id: item?.id }));
                          dispatch(setOpenModal(true));
                        }}
                      >
                        <img src={"/weather-app/icons/pencil.svg"} />{" "}
                      </button>
                      <button className={s.delete} onClick={() => dispatch(deleteLocation(item?.id))}>
                        <img src={"/weather-app/icons/delete.svg"} />{" "}
                      </button>

                      <RenameLocationModal isModalOpen={open} />
                    </>
                  ) : null}{" "}
                </div>
              </div>
            ),
            onClick: () => {
              navigate(`/weather-app/${item?.id ?? ""}`);
              dispatch(addCurrentWeather({ lat: +item.lat, lon: +item.lon }));
            },
          }))}
        />
      </Sider>
      <Layout className="site-layout" style={{ height: "100vh", minWidth: "360px" }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <AddNewLocationForm />
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>Weather App ©2023 Created by Ant UED & Alina Petrova</Footer>
      </Layout>

      <Outlet />
    </Layout>
  );
};

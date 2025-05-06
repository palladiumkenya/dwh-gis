import React from 'react';
import './App.css';
import Filter from "./Filter";
import MapDataView from "./MapDataView";
import {Layout, theme} from "antd";
const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <div>
            <Layout>
                <Header style={{display: 'flex', alignItems: 'center', backgroundColor:'#8F43AE'}}>
                    <div className="demo-logo"/>
                </Header>
                <div>
                    <Layout
                        style={{padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG}}
                    >
                        <Sider style={{background: colorBgContainer}} width={400}>
                           <Filter/>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <MapDataView/>
                        </Content>
                    </Layout>
                </div>
                <Footer style={{textAlign: 'center'}}>
                    NDW
                </Footer>
            </Layout>
        </div>
    );
};

export default App;

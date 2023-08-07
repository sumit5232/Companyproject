import { 
    // FileOutlined, 
    PieChartOutlined,
    //  DesktopOutlined, 
    //  TeamOutlined 
    } from '@ant-design/icons';
  import { Breadcrumb,
     Layout,
      Menu, 
    // theme
   } from 'antd';
  import { useState, useEffect } from 'react';
  import Link from 'antd/es/typography/Link';
   const { 
    Header,
     Content, 
    //  Footer, 
     Sider
     } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
     
        getItem('Dashbord', ),
        // getItem('Data',),
     getItem(<Link href="./Data"></Link>,'Data', <PieChartOutlined />),
  //   getItem(, <DesktopOutlined />),
  //   getItem(, <FileOutlined />),
  //   getItem(, <TeamOutlined />)
  ];
  const Sidebar = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
    // const {
    //   token: { colorBgContainer },
    // } = theme.useToken();
    const handleSubmit = () => {
     
     sessionStorage.removeItem('token')
     sessionStorage.removeItem('name');
   
      // useEffect(() => {
      //     sessionStorage.removeItem('emailAddress');
      //     sessionStorage.removeItem('name');
      //     router.push('/component/loginForm');
      // });
    }
    const [name, setName] = useState('');
  
    useEffect(() => {
      // Retrieve the name from sessionStorage on component mount
      const storedName = sessionStorage.getItem('name');
     
      if (storedName) {
        setName(storedName);
          }
    }, []);
   
    return (
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider  collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" style={{marginTop:"20px"}} />
          <Menu theme="dark" style={{fontSize:"12"}} defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              backgroundColor: ''
            }}
          >
        
           <p style={{color:"white", fontSize:"1rem",text:'bold', textAlign:"end"}}>Welcome: {name}</p>
           {/* <button style={{marginLeft:"75rem", background: "white"}} onClick={handleSubmit}>Logout</button> */}
          </Header>
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
           
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                // background: colorBgContainer,
              }}
            >
              {children}
            </div>
          </Content>
          {/* <Footer
            style={{
              textAlign: 'center',
            }}
          >
          </Footer> */}
        </Layout>
      </Layout>
    );
  };
  export default Sidebar;
  
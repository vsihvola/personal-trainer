import React from 'react';
import CustomerList from './customerlist';
import Trainings from './trainings';
import { Container, AppBar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import '../index.css';


const useStyles = makeStyles((theme) => ({
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  root: {
      flexGrow: 1,
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      height: 48,
      padding: '0 30px',
  },
  indicator: {
    backgroundColor: 'white'
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Header = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Container className={classes.navbarDisplayFlex}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" indicatorColor='primary' classes={{ indicator: classes.indicator }}>
            <Tab label="Customer List" {...tabProps(0)} />
            <Tab label="Trainings" {...tabProps(1)} />
          </Tabs>
        </Container>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CustomerList/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Trainings/>
      </TabPanel>
    </div>
  )
}
export default Header

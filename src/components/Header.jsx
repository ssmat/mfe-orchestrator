import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
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

const routes = ['','exemple'];

function allProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
        component: Link,
        to:`/${index}`
    };
}

const Header = () => {
    const theme = useTheme();
    const pathname = window.location.pathname;
    const [value, setValue] = React.useState(routes.indexOf(pathname.split('/')[1]));

    const CustomTabs = withStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
            margin: '0px',
            filter: 'drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.15))'
        },
        indicator: {
            backgroundColor: '#DA5820',
            height:'3px',
        },
    })(Tabs);

    const CustomTab = withStyles((theme) => ({
        root: {
            fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
            color: '#DA5820',
            opacity: 1,
            },
            '&$selected': {
            color: '#DA5820',
            },
            '&:focus': {
            color: '#DA5820',
            }
        },
        selected: {},
    }))((props) => <Tab disableRipple {...props} />);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
        <AppBar position="static" color="default">
            <CustomTabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" aria-label="tabs example">
                <CustomTab label="Home" {...allProps('')} />
                <CustomTab label={`Materiais para Divulgação`} {...allProps('exemple')} />
            </CustomTabs>
        </AppBar>
        </div>
    );
}

export default Header;
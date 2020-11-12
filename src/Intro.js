import theme from './Theme.js';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IntroImage from './intro-image.jpg';
import logo from './logo.png';

const useStyles = makeStyles((theme) => ({
    '@keyframes slide-in-right': {
        '0%': {
          '-webkit-transform': 'translateX(-1000px)',
                  'transform': 'translateX(-1000px)',
          opacity: 0,
        },
        '100%': {
          '-webkit-transform': 'translateX(0)',
                  'transform': 'translateX(0)',
          opacity: 1,
        }
    },  
    introContainer: {
        animation: '$slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        justifyContent: 'center',
        padding: theme.spacing(1),
        paddingTop: theme.spacing(6),
    },
    introCard: {
        border: `2px solid ${theme.palette.primary.dark}`,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '25px 0 25px 0',
    },
    introHeader: {
        textAlign: 'left',
        minHeight: '50px',
        margin: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
    },
    introBody: {
        textAlign: 'justify',
        margin: theme.spacing(1),
        fontSize: '14px',
    },
    introImage: {
        width: '375px',
        height: '250px',
        border: `1px solid ${theme.palette.primary.dark}`,
        borderRadius: '5px',
    }
}))

export function Intro() {
    const classes = useStyles();
    return (
        <Grid container className={classes.introContainer} xs={12}>
            <Grid container className={classes.introCard} xs={12} md={6}>
                <Grid item className={classes.introHeader} xs={12} style={{
                    borderBottom: `4px solid ${theme.palette.secondary.main}`
                }}>
                    <img src={logo} style={{
                    width: '192px',
                    height: '120px',
                    }} />
                </Grid>
                <Grid container className={classes.introBody}
                direction="row" justify="flex-end" xs={12}>
                    <Grid item xs={12}>                        
                        <Typography variant="p" style={{
                            color: theme.palette.secondary.main,
                        }}>
                            This project utilizes a public API (<b>Nutritionix</b>) to fetch nutrient data and
                            display it in an easy-to-understand "nutrition facts" style label. 
                            The project itself uses React, as well as Material-UI React components to render
                            the data it receives from the public API.
                            Nutritionix's API uses a natural language query, meaning you are able to type
                            queries into the search bar such as "1 slice pizza" or "1oz chicken" to receive
                            specific nutrient data for a type of food and a serving amount. 
                            You can press enter after your query or click on the "+" button to fetch the item
                            in question, and you can click on the icon next to it to reset all the fetched data.
                            When more than one food is added to your list, you will be able to see a total count
                            of nutrients and calories below your queries.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
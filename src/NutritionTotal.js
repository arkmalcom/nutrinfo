import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { toTitleCase } from './App.js';
import theme from './Theme.js';

const useStyles = makeStyles((theme) => ({
    '@keyframes pop-up': {
        "0%": {
          "-webkit-transform": "rotateX(100deg)",
                  "transform": "rotateX(100deg)",
          "-webkit-transform-origin": "bottom",
                  "transform-origin": "bottom",
          opacity: 0,
        },
        "100%": {
          "-webkit-transform": "rotateX(0)",
                  "transform": "rotateX(0)",
          "-webkit-transform-origin": "bottom",
                  "transform-origin": "bottom",
          opacity: 1,
        }
      },
    totalCard: {
      minWidth: '280px',
      maxWidth: '280px',
      border: "2px solid black",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      backgroundColor: theme.palette.primary.light,
      animation: "$pop-up 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both",
    },
    chipContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing(1),
    },
    chipItem: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.light,
        margin: theme.spacing(.5),
    },
    paragraph: {
      textAlign: "left",
      padding: "0 0 0 0",
      margin: "0px 1px 0px 1px"
    }
  }));

export function NutritionTotal(props) {
    const classes = useStyles();
    let totalCalories = 0, totalFat = 0, totalSodium = 0,
    totalProtein = 0, totalCholesterol = 0, totalCarbs = 0;
    const nutritionTotal = props.nutritionTotal.map((item) => {
        console.log(item.nutritionInfo);
        totalCalories += item.nutritionInfo.nf_calories;
        totalFat += item.nutritionInfo.nf_total_fat;
        totalSodium += item.nutritionInfo.nf_sodium;
        totalProtein += item.nutritionInfo.nf_protein;
        totalCholesterol += item.nutritionInfo.nf_cholesterol
        totalCarbs += item.nutritionInfo.nf_total_carbohydrate;
        return (
                <Grid item key={item.nutritionInfo.food_name} xs={6}>
                    <Chip className={classes.chipItem} label={
                        toTitleCase(item.nutritionInfo.food_name) + '(' 
                        + item.nutritionInfo.serving_qty
                        + item.nutritionInfo.serving_unit + ')'
                        } />
                </Grid>
        )
    });
    if(totalCalories === 0 ||
        props.nutritionTotal.length < 2) {
        return null;
    }
    else {
        return(
            <Grid container style={{display: 'flex', justifyContent: 'center'}}>
                <Grid container className={classes.totalCard}>
                    <Grid item  xs={12}>
                        <h1 style={{borderBottom: "1px solid black", margin: "0 0 0 0", fontSize: "30px"}}>
                            Total
                        </h1>
                    </Grid>
                    <Grid container className={classes.chipContainer} xs={12}>
                        {nutritionTotal}
                    </Grid>
                    <Grid item  xs={9}>
                        <p className={classes.paragraph}
                        style={{fontSize: "26px", fontWeight: "bold"}}>Calories</p>
                    </Grid>
                    <Grid item  xs={3}>
                        <p className={classes.paragraph}
                        style={{fontSize: "26px", fontWeight: "bold", textAlign: "right"}}>
                        {Math.round(totalCalories)}
                        </p>
                    </Grid>
                    <Grid item  xs={12} 
                    style={{border: "2px solid black", marginBottom: "2px"}}>
                    </Grid>
                    <Grid item  xs={12}>
                        <p className={classes.paragraph}
                        style={{fontSize: "12px", fontWeight: "bold",
                        textAlign: "right", borderBottom: "1px solid black"}}>% Daily Value*</p>
                    </Grid>
                    <Grid container style={{borderBottom: '1px solid black', fontSize: "12px"}} >
                        <Grid item  xs={6}>
                        <p className={classes.paragraph}><b>Total Fat </b> 
                        {' ' + Math.round(totalFat * 10)/10}g</p>
                        </Grid>
                        <Grid item  xs={6}>
                        <p className={classes.paragraph} style={{textAlign: 'right'}}>
                            {Math.round((totalFat / 78)*100) + '%' }
                        </p>
                        </Grid>
                    </Grid>    
                    <Grid container style={{borderBottom: '1px solid black', fontSize: "12px"}} >
                        <Grid item  xs={6}>
                        <p className={classes.paragraph}><b>Cholesterol</b>
                        {' ' + Math.round(totalCholesterol)}mg</p>
                        </Grid>
                        <Grid item  xs={6}>
                        <p className={classes.paragraph} style={{textAlign: 'right'}}>
                            {Math.round((totalCholesterol / 300)*100) + '%' }
                        </p>
                        </Grid>
                    </Grid>
                    <Grid container style={{borderBottom: '1px solid black', fontSize: "12px"}} >
                        <Grid item  xs={6}>
                        <p className={classes.paragraph}><b>Sodium</b>
                        {' ' + Math.round(totalSodium)}mg</p>
                        </Grid>
                        <Grid item  xs={6}>
                        <p className={classes.paragraph} style={{textAlign: 'right'}}>
                            {Math.round((totalSodium / 2300)*100) + '%' }
                        </p>
                        </Grid>
                    </Grid>
                    <Grid container style={{borderBottom: '1px solid black', fontSize: "12px"}} >
                        <Grid item  xs={9}>
                        <p className={classes.paragraph}><b>Total Carbohydrate</b>
                        {' ' + Math.round(totalCarbs)}g</p>
                        </Grid>
                        <Grid item  xs={3}>
                        <p className={classes.paragraph} style={{textAlign: 'right'}}>
                            {Math.round((totalCarbs / 275)*100) + '%' }
                        </p>
                        </Grid>
                    </Grid>
                    <Grid container style={{borderBottom: '1px solid black', fontSize: "12px"}} >
                        <Grid item  xs={9}>
                        <p className={classes.paragraph}><b>Protein</b>
                        {' ' + Math.round(totalProtein)}g</p>
                        </Grid>
                        <Grid item  xs={3}>
                        <p className={classes.paragraph} style={{textAlign: 'right'}}>
                            {Math.round((totalProtein / 50)*100) + '%' }
                        </p>
                        </Grid>
                    </Grid>               
                </Grid>
            </Grid>
        )
    }
}
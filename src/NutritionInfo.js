import Grid from '@material-ui/core/Grid';
import { toTitleCase } from './App.js';
import { makeStyles } from '@material-ui/core/styles';
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
    nutritionCard: {
      minWidth: '280px',
      maxWidth: '280px',
      border: "2px solid black",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      backgroundColor: theme.palette.primary.light,
      margin: theme.spacing(1),
      animation: "$pop-up 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both",
    },
    paragraph: {
      textAlign: "left",
      padding: "0 0 0 0",
      margin: "0px 1px 0px 1px"
    },

  }));

export function NutritionInfo(props) {
    const classes = useStyles();
    if (props.nutritionInfo === undefined 
      || props.nutritionInfo.length === 0) {
      return null;
    }
    else {
      let containsTransFat = props.nutritionInfo.full_nutrients.filter(
        (data) => { return data.attr_id === 605; }
      );
      let transFat = 0;
      if(containsTransFat[0] === undefined
        || containsTransFat.length === 0) {
          transFat = 0;
      }
      else {
        transFat = containsTransFat[0].value;
      } 
      return (
        <Grid container 
        className={classes.nutritionCard}>
          <Grid item totalCard xs={12}>
            <h1 style={{borderBottom: "1px solid black", margin: "0 0 0 0", fontSize: "30px"}}>
                {toTitleCase(props.nutritionInfo.food_name)}
            </h1>
          </Grid>
          <Grid item totalCard xs={6}>
            <p className={classes.paragraph} style={{fontWeight: "bold"}}>Serving size</p>
          </Grid>
          <Grid item totalCard xs={6}>
            <p className={classes.paragraph} 
            style={{textAlign: "right", fontWeight: "bold"}}>
              {props.nutritionInfo.serving_qty + ' ' + 
               props.nutritionInfo.serving_unit} 
            </p>
          </Grid>
          <Grid item totalCard xs={12} 
          style={{border: "5px solid black", marginTop: "4px", marginBottom: "2px"}} />
          <Grid item totalCard xs={12}>
            <p className={classes.paragraph} style={{fontSize: "13px", fontWeight: "bold"}}>Amount per serving</p>
          </Grid>
          <Grid item totalCard xs={9}>
            <p className={classes.paragraph}
             style={{fontSize: "26px", fontWeight: "bold"}}>Calories</p>
          </Grid>
          <Grid item totalCard xs={3}>
            <p className={classes.paragraph}
             style={{fontSize: "26px", fontWeight: "bold", textAlign: "right"}}>
               {Math.round(parseInt(props.nutritionInfo.nf_calories))}
               </p>
          </Grid>
          <Grid item totalCard xs={12} 
          style={{border: "2px solid black", marginBottom: "2px"}}>
          </Grid>
          <Grid item totalCard xs={12}>
            <p className={classes.paragraph}
             style={{fontSize: "12px", fontWeight: "bold",
              textAlign: "right", borderBottom: "1px solid black"}}>% Daily Value*</p>
          </Grid>
          <Grid container style={{borderBottom: '1px solid black', fontSize: "12px"}} >
            <Grid item totalCard xs={6}>
              <p className={classes.paragraph}><b>Total Fat </b> 
              {' ' + Math.round(props.nutritionInfo.nf_total_fat * 10)/10}g</p>
            </Grid>
            <Grid item totalCard xs={6}>
              <p className={classes.paragraph} style={{textAlign: 'right'}}>
                {Math.round((props.nutritionInfo.nf_total_fat / 78)*100) + '%' }
              </p>
            </Grid>
          </Grid>
          <Grid container style={{borderBottom: '1px solid black', fontSize: "12px"}} >
            <Grid item totalCard xs={6}>
              <p className={classes.paragraph} style={{marginLeft: "1em"}}>Saturated Fat
               {' ' + Math.round(props.nutritionInfo.nf_saturated_fat * 10)/10}g</p>
            </Grid>
            <Grid item totalCard xs={6}>
              <p className={classes.paragraph} style={{textAlign: 'right'}}>
                {Math.round((props.nutritionInfo.nf_saturated_fat / 20)*100) + '%' }
              </p>
            </Grid>
          </Grid>
          <Grid container style={{borderBottom: '1px solid black', fontSize: "12px"}} >
            <Grid item totalCard xs={12}>
              <p className={classes.paragraph} style ={{marginLeft: "1em"}}><i>Trans</i> Fat
               {' ' + Math.round(transFat * 10)/10}g</p>
            </Grid>
          </Grid>
          <Grid container style={{borderBottom: '1px solid black', fontSize: "12px"}} >
            <Grid item totalCard xs={6}>
              <p className={classes.paragraph}><b>Cholesterol</b>
               {' ' + Math.round(props.nutritionInfo.nf_cholesterol)}mg</p>
            </Grid>
            <Grid item totalCard xs={6}>
              <p className={classes.paragraph} style={{textAlign: 'right'}}>
                {Math.round((props.nutritionInfo.nf_cholesterol / 300)*100) + '%' }
              </p>
            </Grid>
          </Grid>
          <Grid container style={{borderBottom: '1px solid black', fontSize: "12px"}} >
            <Grid item totalCard xs={6}>
              <p className={classes.paragraph}><b>Sodium</b>
               {' ' + Math.round(props.nutritionInfo.nf_sodium)}mg</p>
            </Grid>
            <Grid item totalCard xs={6}>
              <p className={classes.paragraph} style={{textAlign: 'right'}}>
                {Math.round((props.nutritionInfo.nf_sodium / 2300)*100) + '%' }
              </p>
            </Grid>
          </Grid>
          <Grid container style={{borderBottom: '1px solid black', fontSize: "12px"}} >
            <Grid item totalCard xs={9}>
              <p className={classes.paragraph}><b>Total Carbohydrate</b>
               {' ' + Math.round(props.nutritionInfo.nf_total_carbohydrate)}g</p>
            </Grid>
            <Grid item totalCard xs={3}>
              <p className={classes.paragraph} style={{textAlign: 'right'}}>
                {Math.round((props.nutritionInfo.nf_total_carbohydrate / 275)*100) + '%' }
              </p>
            </Grid>
          </Grid>
          <Grid container style={{borderBottom: '1px solid black', fontSize: "12px"}} >
            <Grid item totalCard xs={6}>
              <p className={classes.paragraph} style={{marginLeft: "1em"}}>Dietary Fiber
               {' ' + Math.round(props.nutritionInfo.nf_dietary_fiber * 10)/10}g</p>
            </Grid>
            <Grid item totalCard xs={6}>
              <p className={classes.paragraph} style={{textAlign: 'right'}}>
                {Math.round((props.nutritionInfo.nf_dietary_fiber / 28)*100) + '%' }
              </p>
            </Grid>
          </Grid>
          <Grid container style={{borderBottom: '1px solid black', fontSize: "12px"}} >
            <Grid item totalCard xs={12}>
              <p className={classes.paragraph} style={{marginLeft: "1em"}}>Total Sugars
               {' ' + Math.round(props.nutritionInfo.nf_sugars * 10)/10}g</p>
            </Grid>
          </Grid>
          <Grid container style={{borderBottom: '1px solid black', fontSize: "12px"}} >
            <Grid item totalCard xs={9}>
              <p className={classes.paragraph}><b>Protein</b>
               {' ' + Math.round(props.nutritionInfo.nf_protein)}g</p>
            </Grid>
            <Grid item totalCard xs={3}>
              <p className={classes.paragraph} style={{textAlign: 'right'}}>
                {Math.round((props.nutritionInfo.nf_protein / 50)*100) + '%' }
              </p>
            </Grid>
          </Grid>
          <Grid item totalCard xs={12} 
          style={{borderTop: "4px solid black", marginBottom: "2px"}}>
          <p className={classes.paragraph} style={{fontSize: '10px', textAlign: 'justify'}}>
            * Percent Daily Values are based on a 2,000 calorie diet. 
            Your daily value may be higher or lower depending on
            your calorie needs.
          </p>
          </Grid>
          
        </Grid>
      );
    }
    }
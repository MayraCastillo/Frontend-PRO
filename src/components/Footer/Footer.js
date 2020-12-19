import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles(styles);

/**
 * Pie de pagina disponible en cada una de las posibles rutas de la aplicacion web, donde
 * se puede contar con informacion de contacto del grupo de trabajo que desarrollo la aplicacion.
 */
export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container} style={{ width: '80%' }}>
        <p className={classes.left}>
          Síguenos en - 
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
        </p>
        
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="http://project.tonohost.com"
              target="_blank"
              className={classes.a}
            >
              PRO 
            </a>
            , made with love for a better web
          </span>
        </p>
      </div>
    </footer>
  );
}
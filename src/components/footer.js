import React, { Component } from "react";

export default class Footer extends Component {

    render() {
        return (
          <footer>
            <div className="row">
            <div className="col span-1-of-2">
                <ul className="social-links">
                    <li>
                        <a href="https://www.facebook.com/profile.php?id=100007144038643" rel="noopener noreferrer" target="_blank">
                            <ion-icon id="ion-social-facebook" name="logo-facebook"></ion-icon>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/realnuno" rel="noopener noreferrer" target="_blank">
                            <ion-icon id="ion-social-twitter" name="logo-twitter"></ion-icon>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:inbeom918@gmail.com" rel="noopener noreferrer" target="_blank">
                            <ion-icon id="ion-social-email" name="mail"></ion-icon>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="row">
            <p>
                &copy; 2018 Ian Hwang
            </p>
            <p>
                built with
                <ion-icon id="heart-icon" name="heart"></ion-icon> &amp; <ion-icon id="musical-note" name="musical-note"></ion-icon>NoVa, October 2018.
            </p>
        </div>
       </footer>
        )
    }
}

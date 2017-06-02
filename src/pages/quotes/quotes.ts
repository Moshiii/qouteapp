import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

import { Quote } from "../../data/quote.interface";
import {QuotesService} from "../../services/quotes";
/**
 * Generated class for the QuotesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {

  quoteGroup: {category: string, quotes: Quote[], icon: string};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public quoteService: QuotesService) {

  }

  ngOnInit(){
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavorite(selectedQuote: Quote){
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: 'Are you Sure?',
      message: 'Are you sure you want to add the quote?',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            console.log('Ok');
            this.quoteService.addQuoteToFavorites(selectedQuote);
          }
        },
        {
          text: 'No, I changed my mind!',
          role: 'cancel',
          handler: () => {
            console.log('Cancelled!');
          }
        }
      ]
    });

    alert.present();
  }


  onRemoveFromFavorites(quote: Quote) {
    this.quoteService.removeQuoteFromFavorites(quote);
  }

  isFavorite(quote: Quote){
    return this.quoteService.isQuoteFavorite(quote);
  }
}

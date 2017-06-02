import { Component } from '@angular/core';
import {IonicPage,  ModalController, NavController, NavParams} from 'ionic-angular';
import {Quote} from "../../data/quote.interface";
import {QuotesService} from "../../services/quotes";
import {SettingsService} from "../../services/setting";
import {QuotePage} from "../quote/quote";

/**
 * Generated class for the FavoritesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public quoteService: QuotesService,
    public settingsService: SettingsService,
    public modalCtrl: ModalController) {

  }

  ionViewWillEnter() {
    this.quotes = this.quoteService.getFavoriteQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove:boolean) => {
      if( remove){
        this.onRemoveFromFavorites(quote);
      }
    });
  }

  onRemoveFromFavorites(quote: Quote){
    this.quoteService.removeQuoteFromFavorites(quote);
    //this.quotes = this.quoteService.getFavoriteQuotes();
    const position = this.quotes.findIndex((quoteEl: Quote) =>{
      return quoteEl.id == quote.id;
    });
    this.quotes.splice(position,1);
  }


  getBackground(){
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground'

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }
  isAltBackground() {
    return this.settingsService.isAltBackground();
  }

}

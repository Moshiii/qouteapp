import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Toggle} from 'ionic-angular';
import {SettingsService} from "../../services/setting";

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public settingsService: SettingsService) {

  }

  onToggle(toggle: Toggle) {
    this.settingsService.setBackground(toggle.checked);
  }

  checkAltBackground(){
    return this.settingsService.isAltBackground();
  }
}

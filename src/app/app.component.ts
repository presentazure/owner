import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { menuController } from '@ionic/core';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      for: 1
    },
    {
      title: 'Profile',
      url: '/owner-detail',
      icon: 'person',
      for: 1
    },
    {
      title: 'Subscription',
      url: '/plan-detail',
      icon: 'card',
      for: 2
    },
    {
      title: 'Security Guard',
      url: '/guard-list',
      icon: 'contacts',
      for: 2
    },
    {
      title: 'Add New Space',
      url: '/park-address',
      icon: 'pin',
      for: 2
    },
    {
      title: 'Transaction',
      url: '/transaction',
      icon: 'logo-usd',
      for: 1
    },
    {
      title: 'Images',
      url: '/images',
      icon: 'images',
      for: 1
    },
    {
      title: 'Review',
      url: '/review',
      icon: 'text',
      for: 1
    },
    {
      title: 'Scanner',
      url: '/scanner',
      icon: 'barcode',
      for: 1
    }
  ];
  profileData: any = {};
  type = 'owner';
  userLevel = 2;
  
  constructor(
    private platform: Platform,
    private ntrl: NavController,
    private api: ApiService
  ) {
    if (!localStorage.getItem('token')) {
      localStorage.clear();
      this.ntrl.navigateRoot('login');
    }
    this.initializeApp();
    this.api.generateURL();

    this.api.authGetReq('profile').subscribe(
      res => {
        console.log('res', res);
        this.type = localStorage.getItem('userType') || 'owner';
        this.profileData = res;
        if (this.type === 'guard') {
          this.userLevel = 1;
          localStorage.setItem('defaultParking', this.profileData.space_id);
        } else {
          this.userLevel = 2;
        }
      },
      err => {
        console.error('err', err);
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await StatusBar.setStyle({ style: Style.Default });
      await SplashScreen.hide();
    });
  }
  
  closeMenu() {
    menuController.close();
  }
  
  SignOut() {
    menuController.close();
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('defaultParking');
    this.ntrl.navigateForward(['login']);
  }
  
  setting() {
    menuController.close();
    this.ntrl.navigateForward(['setting']);
  }
}
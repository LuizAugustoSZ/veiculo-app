import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { Database, ref, onValue, remove } from '@angular/fire/database';
import { addIcons } from 'ionicons';
import {pencil,trash, add} from 'ionicons/icons';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-veiculo',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './veiculo.page.html',
  styleUrls: ['./veiculo.page.scss']
})

export class VeiculoPage {
  veiculos: any[] = [];
  db: Database = inject(Database);

  constructor(private router: Router, private alertController: AlertController) {
    addIcons({ pencil, trash, add });
    this.listar();
  }
  

  listar() {
    const refVeiculo = ref(this.db, 'veiculos');
    onValue(refVeiculo, snapshot => {
      const data = snapshot.val();
      if (data) {
        this.veiculos = Object.entries(data).map(([key, value]: [string, any]) => ({
          id: key,
          nome: value.nome,
          modelo: value.modelo,
          ano: value.ano
        }));
      } else {
        this.veiculos = [];
      }
    });
  }

  async remover(veiculo: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: `Tem certeza que deseja excluir o veículo? Marca: ${veiculo.nome} Modelo: ${veiculo.modelo}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Excluir',
          handler: () => {
            const refItem = ref(this.db, `veiculos/${veiculo.id}`);
            remove(refItem);
          }
        }
      ]
    });
  
    await alert.present();
  }
  

  editar(veiculo: any) {
    this.router.navigate(['/criarveiculo'], {
      queryParams: {
        id: veiculo.id,
        nome: veiculo.nome,
        modelo: veiculo.modelo,
        ano: veiculo.ano
      }
    });
  }
}



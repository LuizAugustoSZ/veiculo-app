import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { push, ref, update } from '@angular/fire/database';
import { Database } from '@angular/fire/database';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-criarveiculo',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, RouterLink],
  templateUrl: './criarveiculo.page.html',
  styleUrls: ['./criarveiculo.page.scss']
})
export class CriarveiculoPage implements OnInit {
  nome: string = '';
  modelo: string = '';
  ano: string = '';
  id: string | null = null;

  constructor(private db: Database, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.nome = params['nome'];
        this.modelo = params['modelo'];
        this.ano = params['ano'];
      }
    });
  }

  async cadastrar() {
    if (!this.nome || !this.modelo || !this.ano) {
      alert('Preencha todos os campos!');
      return;
    }

    const veiculo = {
      nome: this.nome,
      modelo: this.modelo,
      ano: this.ano
    };

    try {
      if (this.id) {
        const veiculoRef = ref(this.db, `veiculos/${this.id}`);
        await update(veiculoRef, veiculo);
        alert('Veículo atualizado com sucesso!');
      } else {
        const veiculoRef = ref(this.db, 'veiculos');
        await push(veiculoRef, veiculo);
        alert('Veículo cadastrado com sucesso!');
      }

      this.router.navigate(['/veiculo']);

    } catch (error) {
      console.error('Erro ao cadastrar/editar veículo:', error);
      alert('Erro ao cadastrar/editar veículo.');
    }
  }
}

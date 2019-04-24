/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModule } from 'primeng/card';
import { DeploymentNetworkComponent } from './deployment-network.component';


describe('DeploymentNetworkComponent', () => {
  let component: DeploymentNetworkComponent;
  let fixture: ComponentFixture<DeploymentNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CardModule],
      declarations: [DeploymentNetworkComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

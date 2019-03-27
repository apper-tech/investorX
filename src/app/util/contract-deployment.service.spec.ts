/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContractDeploymentService } from './contract-deployment.service';

describe('Service: ContractDeployment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractDeploymentService]
    });
  });

  it('should ...', inject([ContractDeploymentService], (service: ContractDeploymentService) => {
    expect(service).toBeTruthy();
  }));
});

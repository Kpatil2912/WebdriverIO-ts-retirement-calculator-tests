import { RetirementFormDataLayer } from '../../dataLayer/retirementFormDataLayer';

export class RetirementCalculatorInputDao {
  private readonly currentAge: string;
  private readonly retirementAge: string;
  private readonly currentIncome: string;
  private readonly spouseIncome: string;
  private readonly savings: string;
  private readonly contribution: string;
  private readonly increaseRate: string;
  private readonly socialSecurityBenfits: string;
  private readonly socialSecurityOverride: string;
  private readonly noSocialSecurityBenfits: string;
  private readonly additionalIncome: string;
  private readonly retirementYears: string;
  private readonly incomeDesired: string;
  private readonly preReturn: string;
  private readonly postReturn: string;
  private readonly maritalStatus: string;
  private readonly inputAlertDesc: string;
  private readonly otherIncomeDuringRetirement: string;
  private readonly retirementIncomeDependantAge: string;
  private readonly inflationLabel: string;
  private readonly expectedInflationRate: string;
  private readonly retirementAnnualIncome: string;
  private readonly preRoiPercentage: string;
  private readonly postRoiPercentage: string;
  private readonly emptyValue: string;
  private readonly retirementAgeAlertDEsc: string;
  private readonly lessRetirementAge: string;
  private readonly equalRetirementAge: string;

  constructor(data: RetirementFormDataLayer) {
    this.currentAge = data.currentAge;
    this.retirementAge = data.retirementAge;
    this.currentIncome = data.currentIncome;
    this.spouseIncome = data.spouseIncome;
    this.savings = data.savings;
    this.contribution = data.contribution;
    this.increaseRate = data.increaseRate;
    this.socialSecurityBenfits = data.socialSecurityBenfits;
    this.noSocialSecurityBenfits = data.noSocialSecurityBenfits;
    this.socialSecurityOverride = data.socialSecurityOverride;
    this.additionalIncome = data.additionalIncome;
    this.retirementYears = data.retirementYears;
    this.incomeDesired = data.incomeDesired;
    this.preReturn = data.preReturn;
    this.postReturn = data.postReturn;
    this.maritalStatus = data.maritalStatus;
    this.inputAlertDesc = data.inputAlertDesc;
    this.otherIncomeDuringRetirement = data.otherIncomeDuringRetirement;
    this.retirementIncomeDependantAge = data.retirementIncomeDependantAge;
    this.inflationLabel = data.inflationLabel;
    this.expectedInflationRate = data.expectedInflationRate;
    this.retirementAnnualIncome = data.retirementAnnualIncome;
    this.preRoiPercentage = data.preRoiPercentage;
    this.postRoiPercentage = data.postRoiPercentage;
    this.emptyValue = data.emptyValue;
    this.retirementAgeAlertDEsc = data.retirementAgeAlertDEsc;
    this.lessRetirementAge = data.lessRetirementAge;
    this.equalRetirementAge = data.equalRetirementAge;
  }

  public getCurrentAge() {
    return this.currentAge;
  }
  public getRetirementAge() {
    return this.retirementAge;
  }
  public getCurrentIncome() {
    return this.currentIncome;
  }
  public getSpouseIncome() {
    return this.spouseIncome;
  }
  public getSavings() {
    return this.savings;
  }
  public getContribution() {
    return this.contribution;
  }
  public getIncreaseRate() {
    return this.increaseRate;
  }
  public getSocialSecurityBenfits() {
    return this.socialSecurityBenfits;
  }
  public getNoSocialSecurityBenfits() {
    return this.noSocialSecurityBenfits;
  }
  public getSocialSecurityOverride() {
    return this.socialSecurityOverride;
  }
  public getAdditionalIncome() {
    return this.additionalIncome;
  }
  public getRetirementYears() {
    return this.retirementYears;
  }
  public getIncomeDesired() {
    return this.incomeDesired;
  }
  public getPreReturn() {
    return this.preReturn;
  }
  public getPostReturn() {
    return this.postReturn;
  }
  public getMaritalStatus() {
    return this.maritalStatus;
  }
  public getInputAlertDesc() {
    return this.inputAlertDesc;
  }
  public getOtherIncomeDuringRetirement() {
    return this.otherIncomeDuringRetirement;
  }
  public getRetirementIncomeDependantAge() {
    return this.retirementIncomeDependantAge;
  }
  public getInflationLabel() {
    return this.inflationLabel;
  }
  public getExpectedInflationRate() {
    return this.expectedInflationRate;
  }
  public getRetirementAnnualIncome() {
    return this.retirementAnnualIncome;
  }
  public getPreRoiPercentage() {
    return this.preRoiPercentage;
  }
  public getPostRoiPercentage() {
    return this.postRoiPercentage;
  }
  public getEmptyValue() {
    return this.emptyValue;
  }
  public getRetirementAgeAlertDesc() {
    return this.retirementAgeAlertDEsc;
  }
  public getLessRetirementAge() {
    return this.lessRetirementAge;
  }
  public getEqualRetirementAge() {
    return this.equalRetirementAge;
  }
}

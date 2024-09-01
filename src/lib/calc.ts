import { NumbersDTO } from "./numbersdto";

export class Calculator {
    private birthday: Date;
    private day: number;
    private month: number;
    private year: number;

    constructor(birthday: Date) {
        const listBirthday: string[] = birthday.toISOString().split('T')[0].split('-');
        this.birthday = birthday;
        this.year = parseInt(listBirthday[0]);
        this.month = parseInt(listBirthday[1]);
        this.day = parseInt(listBirthday[2]);
    }

    private static getNumber(number: number): number {
        while (number > 22) {
            number = number
                .toString()
                .split('')
                .map(Number)
                .reduce((a, b) => a + b, 0);
        }
        return number;
    }

    public getAllPoints(): NumbersDTO {
        const [leftA, upA, rightA, downA, center] = this.getMainPoints();
        const [leftB, upB, rightB, downB] = this.getBPoints(leftA, upA, rightA, downA, center);
        const [leftC, upC, rightC, downC] = this.getCPoints(leftA, upA, rightA, downA, leftB, upB, rightB, downB);
        const [leftD, upD] = this.getDPoints(leftB, upB, center);

        const [moneyLineCenter, moneyLineLeft, moneyLineRight] = this.getMoneyLine(downB, rightB);
        const [
            menLineA, menLineB, menLineC, menLineD, menLineE, menLineF
        ] = this.getMenLine(leftA, upA, rightA, downA, center);
        const [
            womenLineA, womenLineB, womenLineC, womenLineD, womenLineE, womenLineF
        ] = this.getWomenLine(leftA, upA, rightA, downA, center);

        const [
            sahasraraPhysics, sahasraraEnergy, sahasraraEmotions
        ] = this.getSahasraraNumbers(leftA, upA);
        const [
            adjnaPhysics, adjnaEnergy, adjnaEmotions
        ] = this.getAdjnaNumbers(leftC, upC);
        const [
            vishudhaPhysics, vishudhaEnergy, vishudhaEmotions
        ] = this.getVishudhaNumbers(leftB, upB);
        const [
            anahatanPhysics, anahatanEnergy, anahatanEmotions
        ] = this.getAnahatanNumbers(leftD, upD);
        const [
            manipuraPhysics, manipuraEnergy, manipuraEmotions
        ] = this.getManipuraNumbers(center);
        const [
            svadhistanaPhysics, svadhistanaEnergy, svadhistanaEmotions
        ] = this.getSvadhistanaNumbers(rightB, downB);
        const [
            muladharaPhysics, muladharaEnergy, muladharaEmotions
        ] = this.getMuladharaNumbers(rightA, downA);

        const resultPhysics: number = Calculator.getNumber(
            sahasraraPhysics + adjnaPhysics + vishudhaPhysics + anahatanPhysics + manipuraPhysics + svadhistanaPhysics + muladharaPhysics
        );
        const resultEmotions: number = Calculator.getNumber(
            sahasraraEmotions + adjnaEmotions + vishudhaEmotions + anahatanEmotions + manipuraEmotions + svadhistanaEmotions + muladharaEmotions
        );
        const resultEnergy: number = Calculator.getNumber(
            sahasraraEnergy + adjnaEnergy + vishudhaEnergy + anahatanEnergy + manipuraEnergy + svadhistanaEnergy + muladharaEnergy
        );

        const [sky, earth, skyAndEarth] = this.getFindingYourselfNumbers(leftA, upA, rightA, downA);
        const [men, women, menAndWomen] = this.getSocializationNumbers(menLineA, menLineB, womenLineA, womenLineB);
        const spiritual: number = Calculator.getNumber(skyAndEarth + menAndWomen);

        return new NumbersDTO(
            this.birthday, leftA, upA, rightA, downA, center, leftB, upB, rightB, downB, leftC, upC, rightC, downC, leftD, upD,
            moneyLineCenter, moneyLineLeft, moneyLineRight,
            menLineA, menLineB, menLineC, menLineD, menLineE, menLineF,
            womenLineA, womenLineB, womenLineC, womenLineD, womenLineE, womenLineF,
            sahasraraPhysics, sahasraraEnergy, sahasraraEmotions,
            adjnaPhysics, adjnaEnergy, adjnaEmotions,
            vishudhaPhysics, vishudhaEnergy, vishudhaEmotions,
            anahatanPhysics, anahatanEnergy, anahatanEmotions,
            manipuraPhysics, manipuraEnergy, manipuraEmotions,
            svadhistanaPhysics, svadhistanaEnergy, svadhistanaEmotions,
            muladharaPhysics, muladharaEnergy, muladharaEmotions,
            resultPhysics, resultEmotions, resultEnergy,
            sky, earth, skyAndEarth, men, women, menAndWomen, spiritual
        );
    }

    private getMainPoints(): [number, number, number, number, number] {
        const leftA = Calculator.getNumber(this.day);
        const upA = Calculator.getNumber(this.month);
        const rightA = Calculator.getNumber(this.year);
        const downA = Calculator.getNumber(leftA + upA + rightA);
        const center = Calculator.getNumber(leftA + upA + rightA + downA);
        return [leftA, upA, rightA, downA, center];
    }

    private getBPoints(leftA: number, upA: number, rightA: number, downA: number, center: number): [number, number, number, number] {
        const leftB = Calculator.getNumber(leftA + center);
        const upB = Calculator.getNumber(upA + center);
        const rightB = Calculator.getNumber(rightA + center);
        const downB = Calculator.getNumber(downA + center);
        return [leftB, upB, rightB, downB];
    }

    private getCPoints(
        leftA: number, upA: number, rightA: number, downA: number,
        leftB: number, upB: number, rightB: number, downB: number
    ): [number, number, number, number] {
        const leftC = Calculator.getNumber(leftA + leftB);
        const upC = Calculator.getNumber(upA + upB);
        const rightC = Calculator.getNumber(rightA + rightB);
        const downC = Calculator.getNumber(downA + downB);
        return [leftC, upC, rightC, downC];
    }

    private getDPoints(leftB: number, upB: number, center: number): [number, number] {
        const leftD = Calculator.getNumber(leftB + center);
        const upD = Calculator.getNumber(upB + center);
        return [leftD, upD];
    }

    private getMoneyLine(downB: number, rightB: number): [number, number, number] {
        const moneyLineCenter = Calculator.getNumber(downB + rightB);
        const moneyLineLeft = Calculator.getNumber(downB + moneyLineCenter);
        const moneyLineRight = Calculator.getNumber(rightB + moneyLineCenter);
        return [moneyLineCenter, moneyLineLeft, moneyLineRight];
    }

    private getMenLine(leftA: number, upA: number, rightA: number, downA: number, center: number): [number, number, number, number, number, number] {
        const menLineA = Calculator.getNumber(leftA + upA);
        const menLineB = Calculator.getNumber(rightA + downA);
        const menLineC = Calculator.getNumber(menLineA + center);
        const menLineD = Calculator.getNumber(menLineB + center);
        const menLineE = Calculator.getNumber(menLineA + menLineC);
        const menLineF = Calculator.getNumber(menLineB + menLineD);
        return [menLineA, menLineB, menLineC, menLineD, menLineE, menLineF];
    }

    private getWomenLine(leftA: number, upA: number, rightA: number, downA: number, center: number): [number, number, number, number, number, number] {
        const womenLineA = Calculator.getNumber(upA + rightA);
        const womenLineB = Calculator.getNumber(downA + leftA);
        const womenLineC = Calculator.getNumber(womenLineA + center);
        const womenLineD = Calculator.getNumber(womenLineB + center);
        const womenLineE = Calculator.getNumber(womenLineA + womenLineC);
        const womenLineF = Calculator.getNumber(womenLineB + womenLineD);
        return [womenLineA, womenLineB, womenLineC, womenLineD, womenLineE, womenLineF];
    }

    private getSahasraraNumbers(leftA: number, upA: number): [number, number, number] {
        const sahasraraPhysics = Calculator.getNumber(leftA + upA);
        const sahasraraEnergy = Calculator.getNumber(sahasraraPhysics);
        const sahasraraEmotions = Calculator.getNumber(sahasraraEnergy);
        return [sahasraraPhysics, sahasraraEnergy, sahasraraEmotions];
    }

    private getAdjnaNumbers(leftC: number, upC: number): [number, number, number] {
        const adjnaPhysics = Calculator.getNumber(leftC + upC);
        const adjnaEnergy = Calculator.getNumber(adjnaPhysics);
        const adjnaEmotions = Calculator.getNumber(adjnaEnergy);
        return [adjnaPhysics, adjnaEnergy, adjnaEmotions];
    }

    private getVishudhaNumbers(leftB: number, upB: number): [number, number, number] {
        const vishudhaPhysics = Calculator.getNumber(leftB + upB);
        const vishudhaEnergy = Calculator.getNumber(vishudhaPhysics);
        const vishudhaEmotions = Calculator.getNumber(vishudhaEnergy);
        return [vishudhaPhysics, vishudhaEnergy, vishudhaEmotions];
    }

    private getAnahatanNumbers(leftD: number, upD: number): [number, number, number] {
        const anahatanPhysics = Calculator.getNumber(leftD + upD);
        const anahatanEnergy = Calculator.getNumber(anahatanPhysics);
        const anahatanEmotions = Calculator.getNumber(anahatanEnergy);
        return [anahatanPhysics, anahatanEnergy, anahatanEmotions];
    }

    private getManipuraNumbers(center: number): [number, number, number] {
        const manipuraPhysics = Calculator.getNumber(center);
        const manipuraEnergy = Calculator.getNumber(manipuraPhysics);
        const manipuraEmotions = Calculator.getNumber(manipuraEnergy);
        return [manipuraPhysics, manipuraEnergy, manipuraEmotions];
    }

    private getSvadhistanaNumbers(rightB: number, downB: number): [number, number, number] {
        const svadhistanaPhysics = Calculator.getNumber(rightB + downB);
        const svadhistanaEnergy = Calculator.getNumber(svadhistanaPhysics);
        const svadhistanaEmotions = Calculator.getNumber(svadhistanaEnergy);
        return [svadhistanaPhysics, svadhistanaEnergy, svadhistanaEmotions];
    }

    private getMuladharaNumbers(rightA: number, downA: number): [number, number, number] {
        const muladharaPhysics = Calculator.getNumber(rightA + downA);
        const muladharaEnergy = Calculator.getNumber(muladharaPhysics);
        const muladharaEmotions = Calculator.getNumber(muladharaEnergy);
        return [muladharaPhysics, muladharaEnergy, muladharaEmotions];
    }

    private getFindingYourselfNumbers(leftA: number, upA: number, rightA: number, downA: number): [number, number, number] {
        const sky = Calculator.getNumber(leftA + upA);
        const earth = Calculator.getNumber(rightA + downA);
        const skyAndEarth = Calculator.getNumber(sky + earth);
        return [sky, earth, skyAndEarth];
    }

    private getSocializationNumbers(menLineA: number, menLineB: number, womenLineA: number, womenLineB: number): [number, number, number] {
        const men = Calculator.getNumber(menLineA + menLineB);
        const women = Calculator.getNumber(womenLineA + womenLineB);
        const menAndWomen = Calculator.getNumber(men + women);
        return [men, women, menAndWomen];
    }
}

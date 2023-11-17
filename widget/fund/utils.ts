class CalcFund {
  // 0.06 / (1 + 6 / 12)
  // 计算补仓后能够减少的收益
  private calcAddForReduceLossGains(
    lossRate: number,
    $add: number,
    $now: number
  ): string {
    const res = Number((lossRate / (1 + $add / $now)).toFixed(5));
    return `收益从${lossRate}\n变成了${res}\n减少了${(lossRate - res).toFixed(
      5
    )}`;
  }

  public doCalcAddForReduceLossGains() {
    if (process.argv.slice(2).length < 3) {
      console.log("至少三个参数");
      return;
    }
    console.log(
      this.calcAddForReduceLossGains(
        ...(process.argv.slice(2).map((i) => Number(i)) as [
          number,
          number,
          number
        ])
      )
    );
  }

//   private calcHSTechnology(nowPoint: number, ): string {
//     return `当前点数${nowPoint}`;
//   }

//   public doCalcHSTechnology() {
//     console.log(
//       this.calcHSTechnology(
//         ...(process.argv.slice(2).map((i) => Number(i)) as [
//           number,
//         //   number,
//         //   number
//         ])
//       )
//     );
//   }
}

const calcFund = new CalcFund();

calcFund.doCalcAddForReduceLossGains()
// calcFund.doCalcHSTechnology()

declare const process: {
  argv: any[];
};

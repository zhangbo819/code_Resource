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

  // all 总仓位
  private calcAmount(all: number): number {
    let res = 0;
    // 策略
    const map_tactics: Record<number | string, number> = {
      "0": 1, // 4000 进
      "1": 1,
      "3": 1,
      "6": 3, // -6 翻倍
      "7": 1, // 附近再补
      "10": 3, // 再下3个
      // '1.5': 1.5,
      // '5': 1.5,
      // '7': 2,
      // '10.0': 5,
      // '5': 2.5,
      // '7.5': 1.5,
      // '10.0': 4.5,
      // '12.5': 1.5
    };
    Object.keys(map_tactics).forEach((k) => {
      const part = (all * map_tactics[k]) / 10;
      const rate = Number(k) / 100;
      console.log("k", k);
      const partRes = part * rate;
      res += partRes;
      console.log(`part rate partRes, ${part} * ${rate} = ${partRes}`);
      console.log("res", res, "\n");
    });
    return res;
  }

  public doCalcAmount() {
    this.calcAmount(process.argv.slice(2)[0]);
  }

  // 计算在当前位置需要涨百分之多少才能达到指定的金额
  // 17.2, 3.5
  private calcPercentageFormValue($now: number, $add: number) {
    let target = $now;
    let res = 0;

    const step = 0.01;

    while ($now + $add > target) {
      target *= 1 + step;
      res += step;
      // console.log("target", target);
    }

    return Number((res * 100).toFixed(7)) + "%";
  }

  public doCalcPercentageFormValue() {
    console.log(
      "需要涨",
      this.calcPercentageFormValue(
        ...(process.argv.slice(2).map((i) => Number(i)) as [number, number])
      )
    );
  }
}

const calcFund = new CalcFund();

// calcFund.doCalcAddForReduceLossGains();
// calcFund.doCalcAmount();
calcFund.doCalcPercentageFormValue();

declare const process: {
  argv: any[];
};

import { FC, Suspense } from "react";

export const TestSuspense: FC<{}> = () => {
  const resource = getSpecialPromiseTofetchCities();
  return (
    <Suspense fallback={<div>Loading cities...</div>}>
      <CityList resource={resource} />
    </Suspense>
  );
};

const CityList: FC<{ resource: { read: any } }> = ({ resource }) => {
  //   console.log("resource", resource);
  const data: { id: string; name: string }[] = resource.read();
  return (
    <ul>
      {data.map(({ id, name }) => {
        return <li key={id}>{name}</li>;
      })}
    </ul>
  );
};

function getSpecialPromiseTofetchCities() {
  return wrapPromise(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          new Array(10)
            .fill(0)
            .map((_, j) => ({ id: j + "", name: Math.random() + "" }))
        );
        // reject('出错啦')
      }, 2000);
    })
  );
}

function wrapPromise(promise: Promise<any>) {
  let status: "pending" | "success" | "error" = "pending";
  let response: any;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const handler = {
    pending: () => {
      throw suspender;
    },
    error: () => {
      throw response;
    },
    default: () => response,
  };

  const read = () => {
    const result =
      status === "pending" || status === "error"
        ? handler[status]()
        : handler.default();
    return result;
  };

  return { read };
}

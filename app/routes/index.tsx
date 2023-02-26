import {defer} from "@remix-run/router";
import {Await, useLoaderData} from "@remix-run/react";
import {Suspense} from "react";

export const loader = async () => {

  const testPromise = new Promise(resolve => setTimeout(() => resolve("This takes a looooong time"), 2000))
  const testValue = "This is a fast value"

  return defer({
    testPromise,
    testValue
  })
}


export default function Index() {
    const {testPromise, testValue} = useLoaderData()



  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Remix Test with cloudflare</h1>
      <Suspense fallback={<p>Loading slow value...</p>}>
      <Await resolve={testPromise}>
        {(value) => <p>{value}</p>}
      </Await>
    </Suspense>
      <p>{testValue}</p>
    </div>
  );
}

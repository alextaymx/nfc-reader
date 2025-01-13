import { Wallet } from 'lucide-react';

export default async function RewardPage() {
  const stats = [{
    id: 1,
    name: 'Current Points',
    value: '1,200',
  }, {
    id: 2,
    name: 'Total Earnings',
    value: '1,000',
  }, {
    id: 3,
    name: 'Redeemed Points',
    value: '2,200 Pts',
  }];
  return (
    <>
      <div className="bg-white py-24 dark:bg-transparent sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map(stat => (
              <div
                key={stat.id}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base/7 text-gray-600 dark:text-gray-300">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="lg:col-span-8 xl:col-span-9">
        {/* Header row */}
        <div className="mb-4 flex flex-wrap items-center justify-between">
          <h4 className="text-lg font-semibold">Wallet</h4>
        </div>

        {/* Wallet stats */}
        <div className="flex flex-wrap gap-4">
          <div className="md:w-1/3 lg:flex-1">
            <div className="rounded bg-white p-3 shadow dark:bg-gray-800">
              <div className="flex items-center">
                <div className="mr-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <Wallet />
                  </span>
                </div>
                <div>
                  <span className="block truncate text-sm text-gray-600 dark:text-gray-300">
                    Wallet Balance
                  </span>
                  <h6 className="text-lg font-semibold">$351.4</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 lg:flex-1">
            <div className="rounded bg-white p-3 shadow dark:bg-gray-800">
              <div className="flex items-center">
                <div className="mr-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <Wallet />
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Earnings</span>
                  <h6 className="text-lg font-semibold">$590.40</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 lg:flex-1">
            <div className="rounded bg-white p-3 shadow dark:bg-gray-800">
              <div className="flex items-center">
                <div className="mr-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <Wallet />
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Redeemed</span>
                  <h6 className="text-lg font-semibold">$2,288.04</h6>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 lg:flex-1">
            <div className="rounded bg-white p-3 shadow dark:bg-gray-800">
              <div className="flex items-center">
                <div className="mr-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <Wallet />
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Special Reward</span>
                  <h5 className="text-lg font-semibold">$200.00</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Transactions */}
        <div className="mb-4 mt-6">
          <h6 className="text-base font-semibold dark:text-gray-100">Wallet Transactions</h6>
        </div>
        <div className="mb-4">
          <div className="">
            <div className="overflow-x-auto rounded border">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 font-semibold dark:text-gray-300">Type</th>
                    <th className="px-4 py-2 font-semibold dark:text-gray-300">Amount</th>
                    <th className="px-4 py-2 font-semibold dark:text-gray-300">Date</th>
                    <th className="px-4 py-2 font-semibold dark:text-gray-300">Payment Type</th>
                    <th className="px-4 py-2 font-semibold dark:text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">Wallet Topup</td>
                    <td className="px-4 py-2">
                      <span className="text-green-600">+ $80</span>
                    </td>
                    <td className="px-4 py-2 text-gray-500 dark:text-gray-400">07 Oct 2022 11:22:51</td>
                    <td className="px-4 py-2">Paypal</td>
                    <td className="px-4 py-2">
                      <span className="rounded bg-green-100 px-2 py-1 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Purchase</td>
                    <td className="px-4 py-2">
                      <span className="text-red-600">- $20</span>
                    </td>
                    <td className="px-4 py-2 text-gray-500 dark:text-gray-400">06 Oct 2022 11:22:51</td>
                    <td className="px-4 py-2">Paypal</td>
                    <td className="px-4 py-2">
                      <span className="rounded bg-green-100 px-2 py-1 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Refund</td>
                    <td className="px-4 py-2">
                      <span className="text-green-600">+ $40</span>
                    </td>
                    <td className="px-4 py-2 text-gray-500 dark:text-gray-400">06 Oct 2022 11:22:51</td>
                    <td className="px-4 py-2">Paypal</td>
                    <td className="px-4 py-2">
                      <span className="rounded bg-green-100 px-2 py-1 text-green-800">
                        Completed
                      </span>
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p>Show</p>
            <div className="relative mx-2">
              <button
                type="button"
                className="rounded bg-gray-200 px-2 py-1 text-sm focus:outline-none"
              >
                07
              </button>
              {/* Dropdown items would go here */}
            </div>
            <p>entries</p>
          </div>
          <nav aria-label="Page navigation">
            <ul className="flex items-center">
              <li className="mr-3 text-sm">1 - 07 of 10</li>
              <li className="mr-2">
                <a
                  href="#"
                  className="rounded bg-indigo-600 px-3 py-1 text-sm text-white"
                >
                  1
                </a>
              </li>
              <li className="mr-2">
                <a
                  href="#"
                  className="rounded bg-gray-200 px-3 py-1 text-sm"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="rounded bg-gray-200 px-3 py-1 text-sm"
                >
                  3
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

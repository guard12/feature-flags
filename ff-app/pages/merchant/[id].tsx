import { useRouter } from 'next/router'
import { useQuery } from 'urql';
import { useMutation } from 'urql'

const enableFF = `
  mutation ($merchantId: Int, $feature_flag_id: Int) {
    insert_feature_flag_merchant_one(object: {merchantId: $merchantId, feature_flag_id: $feature_flag_id}) {
        merchantId
        feature_flag_id
      }
  }
`;

const disableFF = `
  mutation ($merchantId: Int, $feature_flag_id: Int) {
    delete_feature_flag_merchant(where: {merchantId: {_eq: $merchantId}, _and: {feature_flag_id: {_eq: $feature_flag_id}}}) {
        returning {
            id
          }
      }
  }
`;

const getAllFF = `
  query {
    feature_flags {
      id
      name
    }
  }
`;

type FF = {
  id: number;
  name: string;
}

const MerchantDetails = () => {
  const router = useRouter()
  const { id } = router.query
  const [enableFFResult, enableFeatureFlag] = useMutation(enableFF)
  const [disableFFResult, disableFeatureFlag] = useMutation(disableFF)
  const [result] = useQuery({
    query: getAllFF,
  });

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h2 className="block text-gray-700 text-sm font-bold mb-2">
          Merchant Id: {id}
        </h2>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Feature Flag id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Feature Flag name
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.feature_flags.map((featrueFlag: FF) => (
                  <tr key={featrueFlag.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{featrueFlag.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{featrueFlag.name}</div>
                    </td>
                    <td className="px-6 py-4 flex text-sm font-medium">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="option1"
                          onChange={() => enableFeatureFlag({ merchantId: id, feature_flag_id: featrueFlag.id })}
                        />
                        <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio10">On</label>
                      </div>
                      <div className="form-check form-check-inline ml-10">
                        <input className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="option2"
                          onChange={() => disableFeatureFlag({ merchantId: id, feature_flag_id: featrueFlag.id })}
                        />
                        <label className="form-check-label inline-block text-gray-800" htmlFor="inlineRadio20">Off</label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MerchantDetails
import axios from 'axios'
import { IncomingMessage } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';


const buildClient = (
  // TODO check why in App props and serversideprops this differs
  // req: IncomingMessage & { cookies: NextApiRequestCookies; },
  req: IncomingMessage,
  res?: NextApiResponse
  ) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.default.svc.cluster.local',
      headers: req.headers
    });
  } else {
    return axios.create({
      baseURL: '/',
    });
  }
}

export default buildClient;

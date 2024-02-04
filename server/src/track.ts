import { NextFunction, Request, Response } from "express"

const MatomoTracker = require('matomo-tracker')

function getRemoteAddr (req: any) {
  if (req.ip) return req.ip

  if (req._remoteAddress) return req._remoteAddress

  var sock = req.socket

  if (sock.socket) return sock.socket.remoteAddress

  return sock.remoteAddress
}

module.exports = (options: any) => {
  var matomo = new MatomoTracker(options.id, 'https://hit.embrapa.io/matomo.php')

  return function track (req: Request, res: Response, next: NextFunction) {
    matomo.track({
      url: options.base + req.originalUrl,
      action_name: 'API call',
      ua: req.header('User-Agent'),
      lang: req.header('Accept-Language'),
      token_auth: options.token,
      dimension1: options.stage,
      dimension2: options.version,
      cip: getRemoteAddr(req)
    });

    next();
  }
}
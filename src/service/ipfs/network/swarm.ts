import { Context, Service } from 'egg';
import * as IPFS from 'ipfs-api';
import { promisify } from 'util';

export interface IIpfsNetworkSwarmService {
  addrs: () => Promise<any>;
  connect: (addr: string) => Promise<any>;
  disconnect: (addr: string) => Promise<any>;
  peers: (options?: any) => Promise<any>;
}

export default class IpfsNetworkSwarmService extends Service
  implements IIpfsNetworkSwarmService {
  private ipfs: any;
  constructor(ctx: Context) {
    super(ctx);
    if (!this.ctx.service.ipfs) {
      this.ipfs = IPFS({
        host: this.config.ipfs.host,
        port: this.config.ipfs.port,
        protocol: this.config.ipfs.protocol,
      });
    }
  }

  public async addrs() {
    try {
      const addrSync = promisify(this.ipfs.swarm.addr);
      const addrsList = await addrSync();
      this.ctx.logger.debug(addrsList);
      return addrsList;
    } catch (err) {
      this.ctx.logger.warn(err);
      return null;
    }
  }

  public async connect(addr: string) {}
  public async disconnect(addr: string) {}
  public async peers(options?: any) {}
}
import logger from "pino";
import dayjs from "dayjs";

const streams = [
  { stream: process.stdout },
  { stream: logger.destination(`${__dirname}/../../logger.log`) }
];

const log = logger({

// transport: {
//      target: 'pino-pretty',
//      options: {
//        colorize: true,
//          translateTime: ',"time":"${dayjs().format()}"',
//        ignore: 'pid',
//      },
// },
    base: {
        pid: false,
    timestamp: () => `,"time":"${dayjs().format()}"`,
    },
  },
  logger.multistream(streams)
);

export default log;
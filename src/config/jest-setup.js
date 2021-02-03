import {
    transaction,
    lit,
    raw,
    ref,
  } from 'objection';
  
  jest.mock('objection');
  const objection = require.requireActual('objection');
  
  lit.mockImplementation((arg) => objection.lit(arg));
  ref.mockImplementation((arg) => objection.ref(arg));
  raw.mockImplementation((arg) => objection.raw(arg));
  
  const jestSetup = {
    mockReject(rejection) {
      return jest.fn(() => new Promise((_, reject) => reject(rejection)));
    },
  
    mockResolve(resolution) {
      return jest.fn(() => new Promise((resolve) => resolve(resolution)));
    },
  
    mockAcl(acl) {
      acl.checks = [];
      jest.spyOn(acl, 'check').mockImplementation((req, action, resource, ownership) => {
        acl.checks.push({
          action,
          resource,
        });
        const perm = { granted: true, filter: jest.fn((data) => data) };
        return new Promise((resolve) => resolve(perm));
      });
    },
  
    mockQuery(model) {
      const mockTransaction = '..tx..';
      const promise = new Promise((resolve) => resolve());
  
      const queryObj = {
        andOn: handler(),
        andWhere: whereHandler(),
        andWhereRaw: handler(),
        as: handler(),
        avg: handler(),
        count: handler(),
        clone: handler(),
        delete: handler(),
        deleteById: handler(),
        distinct: handler(),
        eager: handler(),
        findById: handler(),
        findOne: handler(),
        first: handler(),
        from: handler(),
        groupBy: handler(),
        groupByRaw: handler(),
        insert: handler(),
        insertGraph: handler(),
        join: joinHandler(),
        joinRelation: joinHandler(),
        leftJoin: joinHandler(),
        leftOuterJoin: joinHandler(),
        limit: handler(),
        min: handler(),
        max: handler(),
        naiveEager: handler(),
        offset: handler(),
        on: handler(),
        orderBy: handler(),
        orderByRaw: handler(),
        orWhere: whereHandler(),
        orWhereRaw: handler(),
        orWhereNotNull: handler(),
        orWhereNull: handler(),
        patch: handler(),
        patchAndFetchById: handler(),
        relate: handler(),
        returning: handler(),
        select: handler(),
        update: handler(),
        upsert: handler(),
        upsertGraph: handler(),
        where: whereHandler(),
        whereExists: handler(),
        whereIn: handler(),
        whereNot: handler(),
        whereNotExists: handler(),
        whereNotNull: handler(),
        whereNull: handler(),
        whereRaw:handler(),
        with:handler(),
  
        asCallback: (cb) => promise.asCallback(cb),
        then: (f) => promise.then(() => f(queryObj.mockResult)),
  
        mockBuilderCalls: 0,
        mockResult: null,
        mockTransaction: null,
      };
  
      function handler() {
        return jest.fn(() => {
          queryObj.mockBuilderCalls += 1;
          return queryObj;
        });
      }
  
      function joinHandler() {
        return jest.fn((table, joiner) => {
          if (typeof (joiner) === 'function') {
            joiner.call(queryObj);
          }
          queryObj.mockBuilderCalls += 1;
          return queryObj;
        });
      }
  
      function whereHandler() {
        return jest.fn((firstArg) => {
          if (typeof (firstArg) === 'function') {
            firstArg.call(queryObj, queryObj);
          }
          queryObj.mockBuilderCalls += 1;
          return queryObj;
        });
      }
  
      transaction.mockImplementation((knex, tx) => {
        queryObj.mockTransaction = mockTransaction;
        return tx(queryObj.mockTransaction);
      });
  
      if (model) {
        model.query = jest.fn((tx) => {
          if (queryObj.mockTransaction) {
            expect(tx).toEqual(queryObj.mockTransaction);
          }
          queryObj.mockTransaction = tx;
          return queryObj;
        });
      }
      return queryObj;
    },
  };
  
  export default jestSetup;
  
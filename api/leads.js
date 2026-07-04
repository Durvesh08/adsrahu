"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
// @ts-nocheck
var db_1 = require("./_lib/db");
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var sql, rows, b, rows;
        var _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    (0, db_1.cors)(res);
                    if (req.method === "OPTIONS") {
                        res.status(200).end();
                        return [2 /*return*/];
                    }
                    sql = (0, db_1.getSql)();
                    if (!(req.method === "GET")) return [3 /*break*/, 2];
                    if (!(0, db_1.checkAuth)(req.headers["authorization"])) {
                        res.status(401).json({ error: "Unauthorized" });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT * FROM leads ORDER BY created_at DESC"], ["SELECT * FROM leads ORDER BY created_at DESC"])))];
                case 1:
                    rows = _g.sent();
                    res.status(200).json(rows.map(toCamel));
                    return [2 /*return*/];
                case 2:
                    if (!(req.method === "POST")) return [3 /*break*/, 4];
                    b = (_a = req.body) !== null && _a !== void 0 ? _a : {};
                    if (!b.name || !b.phone) {
                        res.status(400).json({ error: "name and phone are required" });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      INSERT INTO leads (name, phone, email, city, source, status, notes)\n      VALUES (", ", ", ", ", ", ", ", ", ", ", ", ", ")\n      RETURNING *"], ["\n      INSERT INTO leads (name, phone, email, city, source, status, notes)\n      VALUES (", ", ", ", ", ", ", ", ", ", ", ", ", ")\n      RETURNING *"])), b.name, b.phone, (_b = b.email) !== null && _b !== void 0 ? _b : "", (_c = b.city) !== null && _c !== void 0 ? _c : "", (_d = b.source) !== null && _d !== void 0 ? _d : "Website", (_e = b.status) !== null && _e !== void 0 ? _e : "new", (_f = b.notes) !== null && _f !== void 0 ? _f : "")];
                case 3:
                    rows = _g.sent();
                    res.status(201).json(toCamel(rows[0]));
                    return [2 /*return*/];
                case 4:
                    res.status(405).json({ error: "Method not allowed" });
                    return [2 /*return*/];
            }
        });
    });
}
function toCamel(row) {
    return { id: row.id, name: row.name, phone: row.phone, email: row.email, city: row.city, source: row.source, status: row.status, notes: row.notes, createdAt: row.created_at };
}
var templateObject_1, templateObject_2;

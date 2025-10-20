import { useState, useEffect } from "react";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// Grid: https://mui.com/material-ui/react-grid2/#whats-changed
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link, useLocation } from "react-router-dom";
import SidebarCreateBoardModal from "./create";

import { styled } from "@mui/material/styles";
import { deleteBoard, fetchBoardsAPI, updateBoardDetailsAPI } from "~/apis";
import { DEFAULT_ITEM_PER_PAGE, DEFAULT_PAGE } from "~/utils/constants";
import { Button, Menu } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorCurrentActiveBoard,
  updateCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import { MuiColorInput } from "mui-color-input";
import SidebarRenameBoardModal from "~/components/Modal/RenameBoard/RenameBoard";
import { usePermission } from "~/customHooks/usePermission";
import { selectorCurrentUser } from "~/redux/user/userSlice";
import { permission } from "~/config/rbacConfig";
const SidebarItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  color: theme.trello.textColorLightDark(theme),
  padding: "12px 16px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark" ? "#576c816a" : theme.palette.grey[300],
  },
  "&.active": {
    color: theme.palette.mode === "dark" ? "#000" : "#0c66e4",
    backgroundColor: "#e9f2ff",
  },
}));
function Boards() {
  const dispatch = useDispatch();
  const activeBoard = useSelector(selectorCurrentActiveBoard);
  const currentUser = useSelector(selectorCurrentUser);
  // Số lượng bản ghi boards hiển thị tối đa trên 1 page tùy dự án (thường sẽ là 12 cái)
  const [boards, setBoards] = useState(null);
  // Tổng toàn bộ số lượng bản ghi boards có trong Database mà phía BE trả về để FE dùng tính toán phân trang
  const [totalBoards, setTotalBoards] = useState(null);

  // Xử lý phân trang từ url với MUI: https://mui.com/material-ui/react-pagination/#router-integration
  const location = useLocation();
  /**
   * Parse chuỗi string search trong location về đối tượng URLSearchParams trong JavaScript
   * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
   */
  const query = new URLSearchParams(location.search);
  /**
   * Lấy giá trị page từ query, default sẽ là 1 nếu không tồn tại page từ url.
   * Nhắc lại kiến thức cơ bản hàm parseInt cần tham số thứ 2 là Hệ thập phân (hệ đếm cơ số 10) để đảm bảo chuẩn số cho phân trang
   */
  const page = parseInt(query.get("page") || "1", 10);
  const updateStateData = (res) => {
    setBoards(res.boards || []);
    setTotalBoards(res.totalBoards || 0);
  };
  useEffect(() => {
    // // Fake tạm 16 cái item thay cho boards
    // // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    // setBoards([...Array(16)].map((_, i) => i));
    // // Fake tạm giả sử trong Database trả về có tổng 100 bản ghi boards
    // setTotalBoards(100);

    // Gọi API lấy danh sách boards ở đây...
    // ...

    fetchBoardsAPI(location.search).then(updateStateData);
  }, [location.search]);

  const afterCreateOrDeleteNewBoard = () => {
    // Fetch lại danh sách board trong useEffect
    fetchBoardsAPI(location.search).then(updateStateData);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [subAnchorEl, setSubAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openSubMenu = Boolean(subAnchorEl);

  const [color, setColor] = useState("#0088ff");
  const [previewColorBoardId, setPreviewColorBoardId] = useState(null);
  const [openRenameModal, setOpenRenameModal] = useState(false);
  const handleClose = () => {
    setAnchorEl(null);
    dispatch(updateCurrentActiveBoard(null));
  };
  const handleOpenMenuSettingBoard = (e, board) => {
    setAnchorEl(e.currentTarget);
    dispatch(updateCurrentActiveBoard(board));
    setColor(board.backgroundColor || "#0088ff");
    setPreviewColorBoardId(board._id);
  };

  const confirmDeleteColumn = useConfirm();
  const handleDeleteBoard = () => {
    setAnchorEl(null);
    confirmDeleteColumn({
      title: "Delete Board?",
      description:
        "This action will permanently delete your Board and data's Board! Are you sure?",
    })
      .then(async () => {
        await deleteBoard(activeBoard._id).then((res) => {
          dispatch(updateCurrentActiveBoard(null));
          toast.success(res?.deleteResult);
          afterCreateOrDeleteNewBoard();
        });
      })
      .catch(() => {});
  };
  const changeBackgroundBoard = async () => {
    if (!previewColorBoardId) return;

    await updateBoardDetailsAPI(previewColorBoardId, {
      backgroundColor: color,
    });

    toast.success("Background color updated!");

    setSubAnchorEl(null);
    setAnchorEl(null);
    afterCreateOrDeleteNewBoard();
    dispatch(updateCurrentActiveBoard(null));
  };

  const handleSettingBoard = async () => {
    setAnchorEl(null);
    setOpenRenameModal(true);
  };
  // Xử lý phân quyền
  const userRole = activeBoard?.memberIds.find(
    (m) => m.userId === currentUser._id
  )?.role;

  const { hasPermission } = usePermission(userRole);

  // const { hasPermission } = usePermission(cu?.role);
  // Lúc chưa tồn tại boards > đang chờ gọi api thì hiện loading
  // console.log("🚀 ~ Boards ~ boards:", boards);
  if (!boards) {
    return <PageLoadingSpinner caption="Loading Boards..." />;
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#fff",
        color: (theme) => theme.trello.textColorLightDark,
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight})`,
      }}
    >
      <Box sx={{ paddingX: 2, py: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Stack direction="column" spacing={1}>
              <SidebarItem className="active">
                <SpaceDashboardIcon fontSize="small" />
                Boards
              </SidebarItem>
              <SidebarItem>
                <ListAltIcon fontSize="small" />
                Templates
              </SidebarItem>
              <SidebarItem>
                <HomeIcon fontSize="small" />
                Home
              </SidebarItem>
            </Stack>
            <Divider
              sx={{
                my: 1,
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "#ffffff58" : "#0000001f",
              }}
            />
            <Stack direction="column" spacing={1}>
              <SidebarCreateBoardModal
                afterCreateNewBoard={afterCreateOrDeleteNewBoard}
              />
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 9 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
              Your boards:
            </Typography>

            {/* Trường hợp gọi API nhưng không tồn tại cái board nào trong Database trả về */}
            {boards?.length === 0 && (
              <Typography variant="span" sx={{ fontWeight: "bold", mb: 3 }}>
                No result found!
              </Typography>
            )}

            {/* Trường hợp gọi API và có boards trong Database trả về thì render danh sách boards */}
            {boards?.length > 0 && (
              <Grid container spacing={2}>
                {boards.map((b) => (
                  <Grid key={b._id}>
                    <Card sx={{ width: "250px" }}>
                      {/* Ý tưởng mở rộng về sau làm ảnh Cover cho board nhé */}
                      {/* <CardMedia component="img" height="100" image="https://picsum.photos/100" /> */}
                      <Box
                        sx={{
                          height: "50px",
                          backgroundColor: b.backgroundColor || "#0088ff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          disableRipple
                          id="basic-button"
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={(e) => handleOpenMenuSettingBoard(e, b)}
                          size="medium"
                          sx={{
                            minWidth: 0, // bỏ padding mặc định
                            width: 32,
                            height: 32,
                            p: 0,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            "&:hover": {
                              backgroundColor: "transparent",
                            },
                          }}
                        >
                          <MoreVertIcon
                            fontSize="medium"
                            sx={{
                              color: (theme) =>
                                theme.trello.textColorLightDark(theme),
                            }}
                          />
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          slotProps={{
                            list: {
                              "aria-labelledby": "basic-button",
                            },
                          }}
                        >
                          <MenuItem
                            onClick={handleSettingBoard}
                            disabled={!hasPermission(permission.UPDATE_BOARD)}
                          >
                            <ListItemIcon>
                              <DriveFileRenameOutlineIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Setting Board</ListItemText>
                          </MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              if (subAnchorEl) setSubAnchorEl(null);
                              else setSubAnchorEl(e.currentTarget);
                            }}
                            disabled={!hasPermission(permission.UPDATE_BOARD)}
                          >
                            <ListItemIcon>
                              <ColorLensIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>
                              Change Background
                              <Menu
                                id="basic-submenu"
                                anchorEl={subAnchorEl}
                                open={openSubMenu}
                                onClose={() => {
                                  setSubAnchorEl(null);
                                }}
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "right",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                                disableAutoFocusItem
                              >
                                <Box
                                  onClick={(e) => e.stopPropagation()}
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    p: 1,
                                  }}
                                >
                                  <MuiColorInput
                                    format="hex"
                                    value={color}
                                    onChange={(newColor) => {
                                      setColor(newColor);
                                      // đổi màu realtime
                                      setBoards((prev) =>
                                        prev.map((b) =>
                                          b._id === previewColorBoardId
                                            ? {
                                                ...b,
                                                backgroundColor: newColor,
                                              }
                                            : b
                                        )
                                      );
                                    }}
                                  />
                                  <Button
                                    size="small"
                                    variant="contained"
                                    sx={{ mt: 1 }}
                                    onClick={() => changeBackgroundBoard()}
                                  >
                                    Apply
                                  </Button>
                                </Box>
                              </Menu>
                            </ListItemText>
                          </MenuItem>
                          <Divider />
                          <MenuItem
                            onClick={handleDeleteBoard}
                            disabled={!hasPermission(permission.DELETE_BOARD)}
                          >
                            <ListItemIcon>
                              <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Delete Board</ListItemText>
                          </MenuItem>
                        </Menu>
                      </Box>

                      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {b?.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {b?.description}
                        </Typography>
                        <Box
                          component={Link}
                          to={`/boards/${b?._id}`}
                          sx={{
                            mt: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            color: "primary.main",
                            "&:hover": { color: "primary.light" },
                          }}
                        >
                          Go to board <ArrowRightIcon fontSize="small" />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Trường hợp gọi API và có totalBoards trong Database trả về thì render khu vực phân trang  */}
            {totalBoards > 0 && (
              <Box
                sx={{
                  my: 3,
                  pr: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Pagination
                  size="large"
                  color="secondary"
                  showFirstButton
                  showLastButton
                  // Giá trị prop count của component Pagination là để hiển thị tổng số lượng page, công thức là lấy Tổng số lượng bản ghi chia cho số lượng bản ghi muốn hiển thị trên 1 page (ví dụ thường để 12, 24, 26, 48...vv). sau cùng là làm tròn số lên bằng hàm Math.ceil
                  count={Math.ceil(totalBoards / DEFAULT_ITEM_PER_PAGE)}
                  // Giá trị của page hiện tại đang đứng
                  page={page}
                  // Render các page item và đồng thời cũng là những cái link để chúng ta click chuyển trang
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/boards${
                        item.page === DEFAULT_PAGE ? "" : `?page=${item.page}`
                      }`}
                      {...item}
                    />
                  )}
                />
              </Box>
            )}

            <SidebarRenameBoardModal
              onClose={() => setOpenRenameModal(false)}
              openRenameModal={openRenameModal}
              setOpenRenameModal={setOpenRenameModal}
              board={activeBoard}
              afterSettingBoard={afterCreateOrDeleteNewBoard}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Boards;
